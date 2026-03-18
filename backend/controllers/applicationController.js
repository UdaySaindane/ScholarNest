// const db = require('../config/db');

// // @desc    Create new application (when student applies)
// // @route   POST /api/applications
// // @access  Private (Student only)
// exports.createApplication = async(req, res) => {
//     try {
//         const userId = req.user.userId;
//         const { scholarship_id } = req.body;

//         if (!scholarship_id) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Scholarship ID is required'
//             });
//         }

//         // Check if scholarship exists
//         const [scholarships] = await db.query(
//             'SELECT id, title FROM scholarships WHERE id = ?', [scholarship_id]
//         );

//         if (scholarships.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Scholarship not found'
//             });
//         }

//         // Check if already applied
//         const [existingApplications] = await db.query(
//             'SELECT id FROM applications WHERE user_id = ? AND scholarship_id = ?', [userId, scholarship_id]
//         );

//         if (existingApplications.length > 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'You have already applied for this scholarship',
//                 already_applied: true
//             });
//         }

//         // Create application
//         const [result] = await db.query(
//             `INSERT INTO applications (user_id, scholarship_id, status) 
//        VALUES (?, ?, 'applied')`, [userId, scholarship_id]
//         );

//         // Get created application with scholarship details
//         const [application] = await db.query(
//             `SELECT 
//         a.*,
//         s.title, s.provider, s.amount, s.deadline
//       FROM applications a
//       JOIN scholarships s ON a.scholarship_id = s.id
//       WHERE a.id = ?`, [result.insertId]
//         );

//         res.status(201).json({
//             success: true,
//             message: 'Application saved successfully',
//             data: application[0]
//         });

//     } catch (error) {
//         console.error('Create application error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error saving application'
//         });
//     }
// };

// // @desc    Get all applications for logged-in user
// // @route   GET /api/applications
// // @access  Private (Student only)
// exports.getMyApplications = async(req, res) => {
//     try {
//         const userId = req.user.userId;
//         const { status, search, sort = 'recent' } = req.query;

//         // Build WHERE clause
//         let whereConditions = ['a.user_id = ?'];
//         let queryParams = [userId];

//         // Filter by status
//         if (status && status !== 'all') {
//             whereConditions.push('a.status = ?');
//             queryParams.push(status);
//         }

//         // Search by scholarship title or provider
//         if (search) {
//             whereConditions.push('(s.title LIKE ? OR s.provider LIKE ?)');
//             const searchPattern = `%${search}%`;
//             queryParams.push(searchPattern, searchPattern);
//         }

//         const whereClause = whereConditions.join(' AND ');

//         // Sorting
//         let orderBy = 'a.applied_at DESC'; // Default: most recent
//         if (sort === 'deadline') orderBy = 's.deadline ASC';
//         if (sort === 'amount') orderBy = 'CAST(REPLACE(REPLACE(s.amount, "₹", ""), ",", "") AS UNSIGNED) DESC';

//         // Get applications
//         const [applications] = await db.query(
//             `SELECT 
//         a.id,
//         a.scholarship_id,
//         a.applied_at,
//         a.status,
//         a.notes,
//         s.title,
//         s.provider,
//         s.amount,
//         s.deadline,
//         s.apply_link,
//         DATEDIFF(s.deadline, CURDATE()) as days_remaining
//       FROM applications a
//       JOIN scholarships s ON a.scholarship_id = s.id
//       WHERE ${whereClause}
//       ORDER BY ${orderBy}`,
//             queryParams
//         );

//         // Get application statistics
//         const [stats] = await db.query(
//             `SELECT 
//         COUNT(*) as total,
//         SUM(CASE WHEN status = 'applied' THEN 1 ELSE 0 END) as applied,
//         SUM(CASE WHEN status = 'won' THEN 1 ELSE 0 END) as won,
//         SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected,
//         SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending
//       FROM applications
//       WHERE user_id = ?`, [userId]
//         );

//         res.json({
//             success: true,
//             data: {
//                 applications,
//                 stats: stats[0]
//             }
//         });

//     } catch (error) {
//         console.error('Get applications error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error fetching applications'
//         });
//     }
// };

// // @desc    Get single application
// // @route   GET /api/applications/:id
// // @access  Private (Student only - own applications)
// exports.getApplicationById = async(req, res) => {
//     try {
//         const userId = req.user.userId;
//         const { id } = req.params;

//         const [applications] = await db.query(
//             `SELECT 
//         a.*,
//         s.title, s.provider, s.amount, s.deadline, s.description, s.eligibility_text, s.apply_link
//       FROM applications a
//       JOIN scholarships s ON a.scholarship_id = s.id
//       WHERE a.id = ? AND a.user_id = ?`, [id, userId]
//         );

//         if (applications.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Application not found'
//             });
//         }

//         res.json({
//             success: true,
//             data: applications[0]
//         });

//     } catch (error) {
//         console.error('Get application error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error fetching application'
//         });
//     }
// };

// // @desc    Update application status
// // @route   PUT /api/applications/:id
// // @access  Private (Student only - own applications)
// exports.updateApplication = async(req, res) => {
//     try {
//         const userId = req.user.userId;
//         const { id } = req.params;
//         const { status, notes } = req.body;

//         // Validate status
//         const validStatuses = ['pending', 'applied', 'won', 'rejected'];
//         if (status && !validStatuses.includes(status)) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Invalid status'
//             });
//         }

//         // Check if application exists and belongs to user
//         const [existing] = await db.query(
//             'SELECT id FROM applications WHERE id = ? AND user_id = ?', [id, userId]
//         );

//         if (existing.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Application not found'
//             });
//         }

//         // Update application
//         const updates = [];
//         const values = [];

//         if (status) {
//             updates.push('status = ?');
//             values.push(status);
//         }

//         if (notes !== undefined) {
//             updates.push('notes = ?');
//             values.push(notes);
//         }

//         if (updates.length === 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'No updates provided'
//             });
//         }

//         values.push(id);

//         await db.query(
//             `UPDATE applications SET ${updates.join(', ')} WHERE id = ?`,
//             values
//         );

//         // Get updated application
//         const [updated] = await db.query(
//             `SELECT 
//         a.*,
//         s.title, s.provider, s.amount, s.deadline
//       FROM applications a
//       JOIN scholarships s ON a.scholarship_id = s.id
//       WHERE a.id = ?`, [id]
//         );

//         res.json({
//             success: true,
//             message: 'Application updated successfully',
//             data: updated[0]
//         });

//     } catch (error) {
//         console.error('Update application error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error updating application'
//         });
//     }
// };

// // @desc    Delete application
// // @route   DELETE /api/applications/:id
// // @access  Private (Student only - own applications)
// exports.deleteApplication = async(req, res) => {
//     try {
//         const userId = req.user.userId;
//         const { id } = req.params;

//         // Check if application exists and belongs to user
//         const [existing] = await db.query(
//             'SELECT id FROM applications WHERE id = ? AND user_id = ?', [id, userId]
//         );

//         if (existing.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Application not found'
//             });
//         }

//         await db.query('DELETE FROM applications WHERE id = ?', [id]);

//         res.json({
//             success: true,
//             message: 'Application deleted successfully'
//         });

//     } catch (error) {
//         console.error('Delete application error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error deleting application'
//         });
//     }
// };

// // @desc    Check if user has applied for a scholarship
// // @route   GET /api/applications/check/:scholarship_id
// // @access  Private (Student only)
// exports.checkApplication = async(req, res) => {
//     try {
//         const userId = req.user.userId;
//         const { scholarship_id } = req.params;

//         const [applications] = await db.query(
//             'SELECT id, status, applied_at FROM applications WHERE user_id = ? AND scholarship_id = ?', [userId, scholarship_id]
//         );

//         res.json({
//             success: true,
//             data: {
//                 has_applied: applications.length > 0,
//                 application: applications.length > 0 ? applications[0] : null
//             }
//         });

//     } catch (error) {
//         console.error('Check application error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error checking application'
//         });
//     }
// };
const db = require('../config/db');

// @desc    Create new application (when student applies)
// @route   POST /api/applications
// @access  Private (Student only)
exports.createApplication = async(req, res) => {
    try {
        const userId = req.user.userId;
        const { scholarship_id } = req.body;

        if (!scholarship_id) {
            return res.status(400).json({
                success: false,
                message: 'Scholarship ID is required'
            });
        }

        // Check if scholarship exists
        const [scholarships] = await db.query(
            'SELECT id, title FROM scholarships WHERE id = ?', [scholarship_id]
        );

        if (scholarships.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Scholarship not found'
            });
        }

        // Check if already applied
        const [existingApplications] = await db.query(
            'SELECT id FROM applications WHERE user_id = ? AND scholarship_id = ?', [userId, scholarship_id]
        );

        if (existingApplications.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'You have already applied for this scholarship',
                already_applied: true
            });
        }

        // Create application
        const [result] = await db.query(
            `INSERT INTO applications (user_id, scholarship_id, status) 
       VALUES (?, ?, 'applied')`, [userId, scholarship_id]
        );

        // Get created application with scholarship details
        const [application] = await db.query(
            `SELECT 
        a.*,
        s.title, s.provider, s.amount, s.deadline
      FROM applications a
      JOIN scholarships s ON a.scholarship_id = s.id
      WHERE a.id = ?`, [result.insertId]
        );

        res.status(201).json({
            success: true,
            message: 'Application saved successfully',
            data: application[0]
        });

    } catch (error) {
        console.error('Create application error:', error);
        res.status(500).json({
            success: false,
            message: 'Error saving application'
        });
    }
};

// @desc    Get all applications for logged-in user
// @route   GET /api/applications
// @access  Private (Student only)
exports.getMyApplications = async(req, res) => {
    try {
        const userId = req.user.userId;
        const { status, search, sort = 'recent' } = req.query;

        // Build WHERE clause
        let whereConditions = ['a.user_id = ?'];
        let queryParams = [userId];

        // Filter by status
        if (status && status !== 'all') {
            whereConditions.push('a.status = ?');
            queryParams.push(status);
        }

        // Search by scholarship title or provider
        if (search) {
            whereConditions.push('(s.title LIKE ? OR s.provider LIKE ?)');
            const searchPattern = `%${search}%`;
            queryParams.push(searchPattern, searchPattern);
        }

        const whereClause = whereConditions.join(' AND ');

        // Sorting
        let orderBy = 'a.applied_at DESC'; // Default: most recent
        if (sort === 'deadline') orderBy = 's.deadline ASC';
        if (sort === 'amount') orderBy = 'CAST(REPLACE(REPLACE(s.amount, "₹", ""), ",", "") AS UNSIGNED) DESC';

        // Get applications
        const [applications] = await db.query(
            `SELECT 
        a.id,
        a.scholarship_id,
        a.applied_at,
        a.status,
        a.notes,
        s.title,
        s.provider,
        s.amount,
        s.deadline,
        s.apply_link,
        DATEDIFF(s.deadline, CURDATE()) as days_remaining
      FROM applications a
      JOIN scholarships s ON a.scholarship_id = s.id
      WHERE ${whereClause}
      ORDER BY ${orderBy}`,
            queryParams
        );

        // Get application statistics
        const [stats] = await db.query(
            `SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'applied' THEN 1 ELSE 0 END) as applied,
        SUM(CASE WHEN status = 'won' THEN 1 ELSE 0 END) as won,
        SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending
      FROM applications
      WHERE user_id = ?`, [userId]
        );

        res.json({
            success: true,
            data: {
                applications,
                stats: stats[0]
            }
        });

    } catch (error) {
        console.error('Get applications error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching applications'
        });
    }
};

// @desc    Get single application
// @route   GET /api/applications/:id
// @access  Private (Student only - own applications)
exports.getApplicationById = async(req, res) => {
    try {
        const userId = req.user.userId;
        const { id } = req.params;

        const [applications] = await db.query(
            `SELECT 
        a.*,
        s.title, s.provider, s.amount, s.deadline, s.description, s.eligibility_text, s.apply_link
      FROM applications a
      JOIN scholarships s ON a.scholarship_id = s.id
      WHERE a.id = ? AND a.user_id = ?`, [id, userId]
        );

        if (applications.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        res.json({
            success: true,
            data: applications[0]
        });

    } catch (error) {
        console.error('Get application error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching application'
        });
    }
};

// @desc    Update application status
// @route   PUT /api/applications/:id
// @access  Private (Student only - own applications)
exports.updateApplication = async(req, res) => {
    try {
        const userId = req.user.userId;
        const { id } = req.params;
        const { status, notes } = req.body;

        // Validate status
        const validStatuses = ['pending', 'applied', 'won', 'rejected'];
        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status'
            });
        }

        // Check if application exists and belongs to user
        const [existing] = await db.query(
            'SELECT id FROM applications WHERE id = ? AND user_id = ?', [id, userId]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        // Update application
        const updates = [];
        const values = [];

        if (status) {
            updates.push('status = ?');
            values.push(status);
        }

        if (notes !== undefined) {
            updates.push('notes = ?');
            values.push(notes);
        }

        if (updates.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No updates provided'
            });
        }

        values.push(id);

        await db.query(
            `UPDATE applications SET ${updates.join(', ')} WHERE id = ?`,
            values
        );

        // Get updated application
        const [updated] = await db.query(
            `SELECT 
        a.*,
        s.title, s.provider, s.amount, s.deadline
      FROM applications a
      JOIN scholarships s ON a.scholarship_id = s.id
      WHERE a.id = ?`, [id]
        );

        res.json({
            success: true,
            message: 'Application updated successfully',
            data: updated[0]
        });

    } catch (error) {
        console.error('Update application error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating application'
        });
    }
};

// @desc    Delete application
// @route   DELETE /api/applications/:id
// @access  Private (Student only - own applications)
exports.deleteApplication = async(req, res) => {
    try {
        const userId = req.user.userId;
        const { id } = req.params;

        // Check if application exists and belongs to user
        const [existing] = await db.query(
            'SELECT id FROM applications WHERE id = ? AND user_id = ?', [id, userId]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        await db.query('DELETE FROM applications WHERE id = ?', [id]);

        res.json({
            success: true,
            message: 'Application deleted successfully'
        });

    } catch (error) {
        console.error('Delete application error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting application'
        });
    }
};

// @desc    Check if user has applied for a scholarship
// @route   GET /api/applications/check/:scholarship_id
// @access  Private (Student only)
exports.checkApplication = async(req, res) => {
    try {
        const userId = req.user.userId;
        const { scholarship_id } = req.params;

        const [applications] = await db.query(
            'SELECT id, status, applied_at FROM applications WHERE user_id = ? AND scholarship_id = ?', [userId, scholarship_id]
        );

        res.json({
            success: true,
            data: {
                has_applied: applications.length > 0,
                application: applications.length > 0 ? applications[0] : null
            }
        });

    } catch (error) {
        console.error('Check application error:', error);
        res.status(500).json({
            success: false,
            message: 'Error checking application'
        });
    }
};