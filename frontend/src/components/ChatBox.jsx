import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import api from '../utils/api';
import './ChatBox.css';

function ChatBox({ mentorshipId, otherUser, onClose }) {
  const { user } = useAuth();
  const socket = useSocket();
  
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [typing, setTyping] = useState(false);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    fetchMessages();
    
    // Join chat room
    if (socket) {
      socket.emit('chat:join', mentorshipId);
      
      // Listen for new messages
      socket.on('chat:newMessage', handleNewMessage);
      
      // Listen for typing indicator
      socket.on('chat:userTyping', handleUserTyping);
      
      return () => {
        socket.emit('chat:leave', mentorshipId);
        socket.off('chat:newMessage', handleNewMessage);
        socket.off('chat:userTyping', handleUserTyping);
      };
    }
  }, [socket, mentorshipId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await api.get(`/chat/${mentorshipId}`);
      setMessages(response.data.data);
    } catch (err) {
      console.error('Fetch messages error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewMessage = (message) => {
    setMessages(prev => {
      // Avoid duplicates
      const exists = prev.some(m => m.id === message.id);
      if (exists) return prev;
      return [...prev, message];
    });
  };

  const handleUserTyping = (data) => {
    if (data.userId !== user.id) {
      setOtherUserTyping(data.isTyping);
      
      // Clear typing indicator after 3 seconds
      if (data.isTyping) {
        setTimeout(() => setOtherUserTyping(false), 3000);
      }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    
    if (!typing) {
      setTyping(true);
      socket?.emit('chat:typing', {
        mentorshipId,
        userId: user.id,
        userName: user.name,
        isTyping: true
      });
    }

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      setTyping(false);
      socket?.emit('chat:typing', {
        mentorshipId,
        userId: user.id,
        userName: user.name,
        isTyping: false
      });
    }, 2000);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || sending) return;

    const messageText = newMessage.trim();
    setNewMessage('');
    setSending(true);

    try {
      // Send via API for database storage
      const response = await api.post(`/chat/${mentorshipId}`, {
        message: messageText
      });

      // Also emit via socket for real-time delivery
      socket?.emit('chat:message', {
        mentorshipId,
        message: messageText,
        senderId: user.id,
        senderName: user.name,
        senderRole: user.role
      });

      // Stop typing indicator
      setTyping(false);
      socket?.emit('chat:typing', {
        mentorshipId,
        userId: user.id,
        userName: user.name,
        isTyping: false
      });

    } catch (err) {
      console.error('Send message error:', err);
      alert('Failed to send message');
      setNewMessage(messageText); // Restore message on error
    } finally {
      setSending(false);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    // If today
    if (diff < 24 * 60 * 60 * 1000 && date.getDate() === now.getDate()) {
      return date.toLocaleTimeString('en-IN', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
    
    // If this week
    if (diff < 7 * 24 * 60 * 60 * 1000) {
      return date.toLocaleDateString('en-IN', { 
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    
    // Older
    return date.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="chatbox-container">
        <div className="chatbox-header">
          <div className="chat-user-info">
            <img 
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(otherUser.name)}&background=4A90E2&color=fff&size=40`}
              alt={otherUser.name}
            />
            <div>
              <h4>{otherUser.name}</h4>
              <span className="user-role">{otherUser.role}</span>
            </div>
          </div>
          <button className="btn-close-chat" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <div className="chatbox-loading">
          <div className="spinner-border text-primary"></div>
          <p>Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chatbox-container">
      {/* Header */}
      <div className="chatbox-header">
        <div className="chat-user-info">
          <img 
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(otherUser.name)}&background=4A90E2&color=fff&size=40`}
            alt={otherUser.name}
          />
          <div>
            <h4>{otherUser.name}</h4>
            <span className="user-role">{otherUser.role}</span>
          </div>
        </div>
        <button className="btn-close-chat" onClick={onClose}>
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      {/* Messages */}
      <div className="chatbox-messages">
        {messages.length === 0 ? (
          <div className="empty-chat">
            <i className="bi bi-chat-dots"></i>
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`message ${msg.sender_id === user.id ? 'message-sent' : 'message-received'}`}
            >
              <div className="message-content">
                {msg.sender_id !== user.id && (
                  <div className="message-sender">{msg.sender_name}</div>
                )}
                <div className="message-text">{msg.message}</div>
                <div className="message-time">{formatTime(msg.created_at)}</div>
              </div>
            </div>
          ))
        )}
        
        {/* Typing indicator */}
        {otherUserTyping && (
          <div className="typing-indicator">
            <div className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span className="typing-text">{otherUser.name} is typing...</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form className="chatbox-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={handleTyping}
          placeholder="Type a message..."
          disabled={sending}
        />
        <button type="submit" disabled={!newMessage.trim() || sending}>
          {sending ? (
            <span className="spinner-border spinner-border-sm"></span>
          ) : (
            <i className="bi bi-send-fill"></i>
          )}
        </button>
      </form>
    </div>
  );
}

export default ChatBox;