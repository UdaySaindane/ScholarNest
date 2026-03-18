const db = require('../config/db');

// Check if student profile is completed before allowing certain actions
exports.requireProfileCompleted = async(req, res, next) => {
    try {
        const userId = req.user.userId;

        const [profiles] = await db.query(
            'SELECT profile_completed FROM student_profiles WHERE user_id = ?', [userId]
        );

        if (profiles.length === 0 || !profiles[0].profile_completed) {
            return res.status(403).json({
                success: false,
                message: 'Please complete your profile before applying for scholarships',
                profile_completed: false
            });
        }

        next();
    } catch (error) {
        console.error('Profile check error:', error);
        res.status(500).json({
            success: false,
            message: 'Error checking profile status'
        });
    }
};