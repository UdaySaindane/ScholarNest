import React, { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import api from '../utils/api';
import './NotificationBell.css';

function NotificationBell() {
  const socket = useSocket();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUnreadCount();

    // Listen for real-time notifications via socket
    if (socket) {
      socket.on('notification:new', handleNewNotification);
      
      return () => {
        socket.off('notification:new', handleNewNotification);
      };
    }
  }, [socket]);

  const handleNewNotification = (notification) => {
    // Add to notifications list
    setNotifications(prev => [notification, ...prev]);
    // Increment unread count
    setUnreadCount(prev => prev + 1);
    
    // Optional: Show browser notification (if user granted permission)
    if (Notification.permission === 'granted') {
      new Notification('ScholarNest', {
        body: notification.message,
        icon: '/favicon.ico'
      });
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const response = await api.get('/notifications/count');
      setUnreadCount(response.data.unread_count);
    } catch (err) {
      console.error('Fetch unread count error:', err);
    }
  };

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await api.get('/notifications');
      setNotifications(response.data.data);
      setUnreadCount(response.data.unread_count);
    } catch (err) {
      console.error('Fetch notifications error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBellClick = () => {
    if (!showDropdown) {
      fetchNotifications();
    }
    setShowDropdown(!showDropdown);
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await api.put(`/notifications/${notificationId}`);
      // Update local state
      setNotifications(prev =>
        prev.map(n => n.id === notificationId ? { ...n, is_read: 1 } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Mark as read error:', err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await api.put('/notifications/mark-all-read');
      // Update local state
      setNotifications(prev => prev.map(n => ({ ...n, is_read: 1 })));
      setUnreadCount(0);
    } catch (err) {
      console.error('Mark all as read error:', err);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString('en-IN');
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'mentor_request':
        return 'bi-person-plus';
      case 'request_accepted':
        return 'bi-check-circle';
      case 'request_rejected':
        return 'bi-x-circle';
      case 'new_message':
        return 'bi-chat-dots';
      default:
        return 'bi-bell';
    }
  };

  return (
    <div className="notification-bell-container">
      <button className="notification-bell-btn" onClick={handleBellClick}>
        <i className="bi bi-bell"></i>

        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount > 99 ? '99+' : unreadCount}</span>
        )}
      </button>

      {showDropdown && (
        <>
          <div className="notification-overlay" onClick={() => setShowDropdown(false)}></div>
          <div className="notification-dropdown">
            <div className="notification-header">
              <h5>Notifications</h5>
              {unreadCount > 0 && (
                <button className="mark-all-read-btn" onClick={handleMarkAllAsRead}>
                  Mark all as read
                </button>
              )}
            </div>

            <div className="notification-list">
              {loading ? (
                <div className="notification-loading">
                  <div className="spinner-border spinner-border-sm"></div>
                  <span className="ms-2">Loading...</span>
                </div>
              ) : notifications.length === 0 ? (
                <div className="notification-empty">
                  <i className="bi bi-bell-slash"></i>
                  <p>No notifications yet</p>
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`notification-item ${notif.is_read ? 'read' : 'unread'}`}
                    onClick={() => !notif.is_read && handleMarkAsRead(notif.id)}
                  >
                    <div className="notification-icon">
                      <i className={`bi ${getNotificationIcon(notif.type)}`}></i>
                    </div>
                    <div className="notification-content">
                      <p className="notification-message">{notif.message}</p>
                      <span className="notification-time">{formatTime(notif.created_at)}</span>
                    </div>
                    {!notif.is_read && <div className="unread-dot"></div>}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default NotificationBell;