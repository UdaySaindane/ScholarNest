// const db = require('../config/db');

// // @desc    Get all pending mentors (for verification)
// // @route   GET /api/admin/mentors/pending
// // @access  Private (Admin only)
// exports.getPendingMentors = async(req, res) => {
//     try {
//         const [mentors] = await db.query(
//             `SELECT 
//         m.id,
//         m.user_id,
//         u.name,
//         u.email,
//         m.expertise,
//         m.experience_years,
//         m.bio,
//         m.charge_per_session,
//         u.created_at
//       FROM mentors m
//       JOIN users u ON m.user_id = u.id
//       WHERE m.verified = FALSE
//       ORDER BY u.created_at DESC`
//         );

//         res.json({
//             success: true,
//             data: mentors
//         });

//     } catch (error) {
//         console.error('Get pending mentors error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error fetching pending mentors'
//         });
//     }
// };

// // @desc    Verify or reject mentor
// // @route   PUT /api/admin/mentors/:id/verify
// // @access  Private (Admin only)
// exports.verifyMentor = async(req, res) => {
//     try {
//         const { id } = req.params;
//         const { action } = req.body; // 'verify' or 'reject'

//         if (!['verify', 'reject'].includes(action)) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Invalid action'
//             });
//         }

//         if (action === 'verify') {
//             // Verify mentor
//             await db.query('UPDATE mentors SET verified = TRUE WHERE id = ?', [id]);

//             res.json({
//                 success: true,
//                 message: 'Mentor verified successfully'
//             });
//         } else {
//             // Reject - delete mentor record
//             await db.query('DELETE FROM mentors WHERE id = ?', [id]);

//             res.json({
//                 success: true,
//                 message: 'Mentor rejected and removed'
//             });
//         }

//     } catch (error) {
//         console.error('Verify mentor error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error processing mentor verification'
//         });
//     }
// };

// // @desc    Get admin statistics
// // @route   GET /api/admin/stats
// // @access  Private (Admin only)
// exports.getAdminStats = async(req, res) => {
//     try {
//         const [stats] = await db.query(`
//       SELECT 
//         (SELECT COUNT(*) FROM users WHERE role = 'student') as total_students,
//         (SELECT COUNT(*) FROM users WHERE role = 'mentor') as total_mentors,
//         (SELECT COUNT(*) FROM mentors WHERE verified = TRUE) as verified_mentors,
//         (SELECT COUNT(*) FROM mentors WHERE verified = FALSE) as pending_mentors,
//         (SELECT COUNT(*) FROM scholarships) as total_scholarships,
//         (SELECT COUNT(*) FROM applications) as total_applications,
//         (SELECT COUNT(*) FROM mentorship_requests) as total_mentorship_requests
//     `);

//         res.json({
//             success: true,
//             data: stats[0]
//         });

//     } catch (error) {
//         console.error('Get stats error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error fetching statistics'
//         });
//     }
// };


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
        const { action } = req.body;

        if (!['verify', 'reject'].includes(action)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid action'
            });
        }

        if (action === 'verify') {
            await db.query('UPDATE mentors SET verified = TRUE WHERE id = ?', [id]);
            res.json({
                success: true,
                message: 'Mentor verified successfully'
            });
        } else {
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
        (SELECT COUNT(*) FROM applications WHERE status = 'pending') as pending_applications,
        (SELECT COUNT(*) FROM applications WHERE status = 'applied') as applied_applications,
        (SELECT COUNT(*) FROM applications WHERE status = 'won') as won_applications,
        (SELECT COUNT(*) FROM applications WHERE status = 'rejected') as rejected_applications,
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

// @desc    Get all students with details
// @route   GET /api/admin/students
// @access  Private (Admin only)
exports.getAllStudents = async(req, res) => {
    try {
        const [students] = await db.query(`
      SELECT 
        u.id,
        u.name,
        u.email,
        u.created_at,
        sp.profile_completed,
        sp.education_level,
        sp.college_university,
        sp.state,
        sp.city,
        (SELECT COUNT(*) FROM applications WHERE user_id = u.id) as total_applications,
        (SELECT COUNT(*) FROM applications WHERE user_id = u.id AND status = 'won') as won_scholarships,
        (SELECT COUNT(*) FROM mentorship_requests WHERE student_id = u.id AND status = 'accepted') as connected_mentors
      FROM users u
      LEFT JOIN student_profiles sp ON u.id = sp.user_id
      WHERE u.role = 'student'
      ORDER BY u.created_at DESC
    `);

        res.json({
            success: true,
            data: students
        });
    } catch (error) {
        console.error('Get students error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching students'
        });
    }
};

// @desc    Get all mentors with details
// @route   GET /api/admin/mentors
// @access  Private (Admin only)
exports.getAllMentors = async(req, res) => {
    try {
        const [mentors] = await db.query(`
      SELECT 
        m.id,
        m.user_id,
        u.name,
        u.email,
        m.expertise,
        m.experience_years,
        m.bio,
        m.charge_per_session,
        m.verified,
        u.created_at,
        (SELECT COUNT(*) FROM mentorship_requests WHERE mentor_id = m.id) as total_requests,
        (SELECT COUNT(*) FROM mentorship_requests WHERE mentor_id = m.id AND status = 'accepted') as accepted_students,
        (SELECT COUNT(*) FROM mentorship_requests WHERE mentor_id = m.id AND status = 'pending') as pending_requests
      FROM mentors m
      JOIN users u ON m.user_id = u.id
      ORDER BY m.verified DESC, u.created_at DESC
    `);

        res.json({
            success: true,
            data: mentors
        });
    } catch (error) {
        console.error('Get mentors error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching mentors'
        });
    }
};

// @desc    Get all applications with details
// @route   GET /api/admin/applications
// @access  Private (Admin only)
exports.getAllApplications = async(req, res) => {
    try {
        const { status } = req.query;

        let query = `
      SELECT 
        a.id,
        a.user_id,
        a.scholarship_id,
        a.status,
        a.applied_at,
        a.notes,
        u.name as student_name,
        u.email as student_email,
        s.title as scholarship_title,
        s.amount as scholarship_amount,
        s.provider
      FROM applications a
      JOIN users u ON a.user_id = u.id
      JOIN scholarships s ON a.scholarship_id = s.id
    `;

        const params = [];
        if (status && status !== 'all') {
            query += ' WHERE a.status = ?';
            params.push(status);
        }

        query += ' ORDER BY a.applied_at DESC';

        const [applications] = await db.query(query, params);

        res.json({
            success: true,
            data: applications
        });
    } catch (error) {
        console.error('Get applications error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching applications'
        });
    }
};

// @desc    Update application status
// @route   PUT /api/admin/applications/:id/status
// @access  Private (Admin only)
exports.updateApplicationStatus = async(req, res) => {
    try {
        const { id } = req.params;
        const { status, notes } = req.body;

        const validStatuses = ['pending', 'applied', 'won', 'rejected'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status'
            });
        }

        await db.query(
            'UPDATE applications SET status = ?, notes = ? WHERE id = ?', [status, notes || null, id]
        );

        res.json({
            success: true,
            message: 'Application status updated successfully'
        });
    } catch (error) {
        console.error('Update application status error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating application status'
        });
    }
};

// @desc    Get student details by ID
// @route   GET /api/admin/students/:id
// @access  Private (Admin only)
exports.getStudentDetails = async(req, res) => {
    try {
        const { id } = req.params;

        const [students] = await db.query(`
      SELECT 
        u.id,
        u.name,
        u.email,
        u.created_at,
        sp.*
      FROM users u
      LEFT JOIN student_profiles sp ON u.id = sp.user_id
      WHERE u.id = ? AND u.role = 'student'
    `, [id]);

        if (students.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }

        // Get student's applications
        const [applications] = await db.query(`
      SELECT 
        a.*,
        s.title as scholarship_title,
        s.amount,
        s.provider
      FROM applications a
      JOIN scholarships s ON a.scholarship_id = s.id
      WHERE a.user_id = ?
      ORDER BY a.applied_at DESC
    `, [id]);

        // Get student's mentors
        const [mentors] = await db.query(`
      SELECT 
        mr.id,
        mr.status,
        mr.created_at,
        m.expertise,
        u.name as mentor_name,
        u.email as mentor_email
      FROM mentorship_requests mr
      JOIN mentors m ON mr.mentor_id = m.id
      JOIN users u ON m.user_id = u.id
      WHERE mr.student_id = ?
      ORDER BY mr.created_at DESC
    `, [id]);

        res.json({
            success: true,
            data: {
                student: students[0],
                applications,
                mentors
            }
        });
    } catch (error) {
        console.error('Get student details error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching student details'
        });
    }
};