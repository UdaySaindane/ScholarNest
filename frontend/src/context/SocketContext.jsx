

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user, isAuthenticated } = useAuth();
  const socketRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated && user && user.id) {
      const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

      // Close any existing socket first
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }

      const newSocket = io(SOCKET_URL, {
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      // FIX: emit user:join on every connect AND reconnect
      newSocket.on('connect', () => {
        console.log('✅ Socket connected:', newSocket.id);
        console.log('✅ Sending user:join with userId:', user.id);
        newSocket.emit('user:join', user.id);  // user.id is guaranteed here
      });

      newSocket.on('reconnect', () => {
        console.log('🔄 Socket reconnected, re-sending user:join');
        newSocket.emit('user:join', user.id);
      });

      newSocket.on('disconnect', () => {
        console.log('❌ Socket disconnected');
      });

      newSocket.on('connect_error', (error) => {
        console.error('❌ Socket connection error:', error);
      });

      socketRef.current = newSocket;
      setSocket(newSocket);

      return () => {
        newSocket.close();
        socketRef.current = null;
        setSocket(null);
      };
    } else {
      // Disconnect if logged out
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
        setSocket(null);
      }
    }
  }, [isAuthenticated, user]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};


