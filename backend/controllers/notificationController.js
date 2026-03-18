const db = require('../config/db');

// Helper: create a notification and push via socket if user is online
async function createNotification(userId, type, message, io) {
    try {
        await db.query(
            `INSERT INTO notifications (user_id, type, message) VALUES (?, ?, ?)`, [userId, type, message]
        );

        // Push real-time notification via socket if io is available
        if (io) {
            io.emit('notification:new', {
                userId: userId,
                type: type,
                message: message,
                created_at: new Date().toISOString(),
                is_read: 0
            });
        }

        console.log(`🔔 Notification created for user ${userId}: ${message}`);
    } catch (err) {
        console.error('Create notification error:', err);
    }
}

// @desc    Get all notifications for logged-in user
// @route   GET /api/notifications
// @access  Private
exports.getNotifications = async(req, res) => {
    try {
        const userId = req.user.userId;

        const [notifications] = await db.query(
            `SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 50`, [userId]
        );

        // Also get unread count
        const [countResult] = await db.query(
            `SELECT COUNT(*) as unread FROM notifications WHERE user_id = ? AND is_read = 0`, [userId]
        );

        res.json({
            success: true,
            data: notifications,
            unread_count: countResult[0].unread
        });
    } catch (error) {
        console.error('Get notifications error:', error);
        res.status(500).json({ success: false, message: 'Error fetching notifications' });
    }
};

// @desc    Get unread notification count
// @route   GET /api/notifications/count
// @access  Private
exports.getUnreadCount = async(req, res) => {
    try {
        const userId = req.user.userId;

        const [countResult] = await db.query(
            `SELECT COUNT(*) as unread FROM notifications WHERE user_id = ? AND is_read = 0`, [userId]
        );

        res.json({
            success: true,
            unread_count: countResult[0].unread
        });
    } catch (error) {
        console.error('Get unread count error:', error);
        res.status(500).json({ success: false, message: 'Error fetching count' });
    }
};

// @desc    Mark a single notification as read
// @route   PUT /api/notifications/:id
// @access  Private
exports.markAsRead = async(req, res) => {
    try {
        const userId = req.user.userId;
        const { id } = req.params;

        await db.query(
            `UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?`, [id, userId]
        );

        res.json({ success: true, message: 'Notification marked as read' });
    } catch (error) {
        console.error('Mark as read error:', error);
        res.status(500).json({ success: false, message: 'Error marking notification' });
    }
};

// @desc    Mark all notifications as read
// @route   PUT /api/notifications/mark-all-read
// @access  Private
exports.markAllAsRead = async(req, res) => {
    try {
        const userId = req.user.userId;

        await db.query(
            `UPDATE notifications SET is_read = 1 WHERE user_id = ?`, [userId]
        );

        res.json({ success: true, message: 'All notifications marked as read' });
    } catch (error) {
        console.error('Mark all as read error:', error);
        res.status(500).json({ success: false, message: 'Error marking notifications' });
    }
};

module.exports.createNotification = createNotification;