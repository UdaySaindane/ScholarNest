const express = require('express');
const router = express.Router();
const {
    getNotifications,
    getUnreadCount,
    markAsRead,
    markAllAsRead
} = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');

// All routes require authentication
router.get('/', protect, getNotifications);
router.get('/count', protect, getUnreadCount);
router.put('/:id', protect, markAsRead);
router.put('/mark-all-read', protect, markAllAsRead);

module.exports = router;