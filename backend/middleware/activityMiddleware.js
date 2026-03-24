const db = require('../config/db');

// Log user activity
const logActivity = async(userId, action, details = null, adminId = null) => {
    try {
        await db.query(
            'INSERT INTO activity_logs (user_id, action, details, admin_id) VALUES (?, ?, ?, ?)', [userId, action, details ? JSON.stringify(details) : null, adminId]
        );
    } catch (error) {
        console.error('Activity log error:', error);
    }
};

// Middleware to log route access
const activityLogger = (action) => {
    return async(req, res, next) => {
        if (req.user && req.user.userId) {
            const details = {
                method: req.method,
                path: req.path,
                ip: req.ip
            };
            await logActivity(req.user.userId, action, details);
        }
        next();
    };
};

module.exports = { logActivity, activityLogger };