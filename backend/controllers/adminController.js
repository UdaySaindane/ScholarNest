const db = require('../config/db');

// @desc    Get all pending mentors (for verification)
// @route   GET /api/admin/mentors/pending
// @access  Private (Admin only)
exports.getPendingMentors = async(req, res) => {
    try {
        const [mentors] = await db.query(
            `SELECT 
        m.id,
        m.user_id,
        u.name,
        u.email,
        m.expertise,
        m.experience_years,
        m.bio,
        m.charge_per_session,
        u.created_at
      FROM mentors m
      JOIN users u ON m.user_id = u.id
      WHERE m.verified = FALSE
      ORDER BY u.created_at DESC`
        );

        res.json({
            success: true,
            data: mentors
        });

    } catch (error) {
        console.error('Get pending mentors error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching pending mentors'
        });
    }
};

// @desc    Verify or reject mentor
// @route   PUT /api/admin/mentors/:id/verify
// @access  Private (Admin only)
exports.verifyMentor = async(req, res) => {
    try {
        const { id } = req.params;
        const { action } = req.body; // 'verify' or 'reject'

        if (!['verify', 'reject'].includes(action)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid action'
            });
        }

        if (action === 'verify') {
            // Verify mentor
            await db.query('UPDATE mentors SET verified = TRUE WHERE id = ?', [id]);

            res.json({
                success: true,
                message: 'Mentor verified successfully'
            });
        } else {
            // Reject - delete mentor record
            await db.query('DELETE FROM mentors WHERE id = ?', [id]);

            res.json({
                success: true,
                message: 'Mentor rejected and removed'
            });
        }

    } catch (error) {
        console.error('Verify mentor error:', error);
        res.status(500).json({
            success: false,
            message: 'Error processing mentor verification'
        });
    }
};

// @desc    Get admin statistics
// @route   GET /api/admin/stats
// @access  Private (Admin only)
exports.getAdminStats = async(req, res) => {
    try {
        const [stats] = await db.query(`
      SELECT 
        (SELECT COUNT(*) FROM users WHERE role = 'student') as total_students,
        (SELECT COUNT(*) FROM users WHERE role = 'mentor') as total_mentors,
        (SELECT COUNT(*) FROM mentors WHERE verified = TRUE) as verified_mentors,
        (SELECT COUNT(*) FROM mentors WHERE verified = FALSE) as pending_mentors,
        (SELECT COUNT(*) FROM scholarships) as total_scholarships,
        (SELECT COUNT(*) FROM applications) as total_applications,
        (SELECT COUNT(*) FROM mentorship_requests) as total_mentorship_requests
    `);

        res.json({
            success: true,
            data: stats[0]
        });

    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching statistics'
        });
    }
};