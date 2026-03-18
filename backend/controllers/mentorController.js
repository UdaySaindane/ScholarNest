// const db = require('../config/db');

// // @desc    Get all verified mentors
// // @route   GET /api/mentors
// // @access  Public
// exports.getAllMentors = async(req, res) => {
//     try {
//         const { search, expertise } = req.query;

//         let whereConditions = ['m.verified = TRUE'];
//         let queryParams = [];

//         // Search by name or expertise
//         if (search) {
//             whereConditions.push('(u.name LIKE ? OR m.expertise LIKE ?)');
//             const searchPattern = `%${search}%`;
//             queryParams.push(searchPattern, searchPattern);
//         }

//         // Filter by expertise
//         if (expertise) {
//             whereConditions.push('m.expertise LIKE ?');
//             queryParams.push(`%${expertise}%`);
//         }

//         const whereClause = whereConditions.join(' AND ');

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
//         (SELECT COUNT(*) FROM mentorship_requests WHERE mentor_id = m.id) as total_students
//       FROM mentors m
//       JOIN users u ON m.user_id = u.id
//       WHERE ${whereClause}
//       ORDER BY m.experience_years DESC`,
//             queryParams
//         );

//         res.json({
//             success: true,
//             data: mentors
//         });

//     } catch (error) {
//         console.error('Get mentors error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error fetching mentors'
//         });
//     }
// };

// // @desc    Get single mentor by ID
// // @route   GET /api/mentors/:id
// // @access  Public
// exports.getMentorById = async(req, res) => {
//     try {
//         const { id } = req.params;

//         const [mentors] = await db.query(
//             `SELECT 
//         m.*,
//         u.name,
//         u.email,
//         (SELECT COUNT(*) FROM mentorship_requests WHERE mentor_id = m.id) as total_students
//       FROM mentors m
//       JOIN users u ON m.user_id = u.id
//       WHERE m.id = ? AND m.verified = TRUE`, [id]
//         );

//         if (mentors.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Mentor not found'
//             });
//         }

//         res.json({
//             success: true,
//             data: mentors[0]
//         });

//     } catch (error) {
//         console.error('Get mentor error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error fetching mentor details'
//         });
//     }
// };

// // @desc    Request mentor for scholarship
// // @route   POST /api/mentors/request
// // @access  Private (Student only)
// exports.requestMentor = async(req, res) => {
//     try {
//         const studentId = req.user.userId;
//         const { mentor_id, scholarship_id } = req.body;

//         if (!mentor_id) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Mentor ID is required'
//             });
//         }

//         // Check if mentor exists and is verified
//         const [mentors] = await db.query(
//             'SELECT id FROM mentors WHERE id = ? AND verified = TRUE', [mentor_id]
//         );

//         if (mentors.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Mentor not found or not verified'
//             });
//         }

//         // Check if already requested - use mentor_id (mentors table id), NOT user_id
//         const [existing] = await db.query(
//             'SELECT id FROM mentorship_requests WHERE student_id = ? AND mentor_id = ?', [studentId, mentor_id]
//         );

//         if (existing.length > 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'You have already requested this mentor'
//             });
//         }

//         // FIX: Insert mentor_id (from mentors table), NOT mentors[0].user_id
//         await db.query(
//             'INSERT INTO mentorship_requests (student_id, mentor_id, scholarship_id) VALUES (?, ?, ?)', [studentId, mentor_id, scholarship_id || null]
//         );

//         res.status(201).json({
//             success: true,
//             message: 'Mentor request sent successfully'
//         });

//     } catch (error) {
//         console.error('Request mentor error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error sending mentor request'
//         });
//     }
// };

// // @desc    Get mentor's requests (for mentor dashboard)
// // @route   GET /api/mentors/my-requests
// // @access  Private (Mentor only)
// exports.getMyRequests = async(req, res) => {
//     try {
//         const userId = req.user.userId;

//         // FIX: First get the mentor_id from mentors table using user_id
//         const [mentor] = await db.query(
//             'SELECT id FROM mentors WHERE user_id = ?', [userId]
//         );

//         if (mentor.length === 0) {
//             return res.json({
//                 success: true,
//                 data: []
//             });
//         }

//         const mentorId = mentor[0].id; // This is the mentors table id (e.g. 4)

//         // Now query using the correct mentor_id
//         const [requests] = await db.query(
//             `SELECT 
//         mr.id,
//         mr.status,
//         mr.requested_at,
//         u.name as student_name,
//         u.email as student_email,
//         s.title as scholarship_title
//       FROM mentorship_requests mr
//       JOIN users u ON mr.student_id = u.id
//       LEFT JOIN scholarships s ON mr.scholarship_id = s.id
//       WHERE mr.mentor_id = ?
//       ORDER BY mr.requested_at DESC`, [mentorId]
//         );

//         res.json({
//             success: true,
//             data: requests
//         });

//     } catch (error) {
//         console.error('Get requests error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error fetching requests'
//         });
//     }
// };

// // @desc    Accept/Reject mentor request
// // @route   PUT /api/mentors/requests/:id
// // @access  Private (Mentor only)
// exports.updateRequest = async(req, res) => {
//     try {
//         const userId = req.user.userId;
//         const { id } = req.params;
//         const { status } = req.body;

//         if (!['accepted', 'rejected'].includes(status)) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Invalid status'
//             });
//         }

//         // FIX: Get mentor_id from mentors table first
//         const [mentor] = await db.query(
//             'SELECT id FROM mentors WHERE user_id = ?', [userId]
//         );

//         if (mentor.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Mentor not found'
//             });
//         }

//         const mentorId = mentor[0].id;

//         // Verify request belongs to this mentor using correct mentor_id
//         const [requests] = await db.query(
//             'SELECT id FROM mentorship_requests WHERE id = ? AND mentor_id = ?', [id, mentorId]
//         );

//         if (requests.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Request not found'
//             });
//         }

//         await db.query(
//             'UPDATE mentorship_requests SET status = ?, accepted_at = NOW() WHERE id = ?', [status, id]
//         );

//         res.json({
//             success: true,
//             message: `Request ${status} successfully`
//         });

//     } catch (error) {
//         console.error('Update request error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error updating request'
//         });
//     }
// };

// //////////////////////////////////////////
// ///////////////////mentor form ///////////////////////
// //////////////////////////////////////////

// // @desc    Get mentor's own profile
// // @route   GET /api/mentors/profile
// // @access  Private (Mentor only)
// exports.getMyProfile = async(req, res) => {
//     try {
//         const userId = req.user.userId;

//         const [mentors] = await db.query(
//             `SELECT 
//         m.*,
//         u.name,
//         u.email
//       FROM mentors m
//       JOIN users u ON m.user_id = u.id
//       WHERE m.user_id = ?`, [userId]
//         );

//         if (mentors.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Mentor profile not found'
//             });
//         }

//         res.json({
//             success: true,
//             data: mentors[0]
//         });

//     } catch (error) {
//         console.error('Get mentor profile error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error fetching profile'
//         });
//     }
// };

// // @desc    Update mentor's own profile
// // @route   PUT /api/mentors/profile
// // @access  Private (Mentor only)
// exports.updateMyProfile = async(req, res) => {
//     try {
//         const userId = req.user.userId;
//         const { expertise, experience_years, bio, charge_per_session } = req.body;

//         // Validation
//         if (!expertise || !experience_years || !bio) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Expertise, experience years, and bio are required'
//             });
//         }

//         // Check if mentor profile exists
//         const [existing] = await db.query(
//             'SELECT id FROM mentors WHERE user_id = ?', [userId]
//         );

//         if (existing.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Mentor profile not found'
//             });
//         }

//         // Update mentor profile
//         await db.query(
//             `UPDATE mentors 
//        SET expertise = ?,
//            experience_years = ?,
//            bio = ?,
//            charge_per_session = ?
//        WHERE user_id = ?`, [expertise, experience_years, bio, charge_per_session || 0, userId]
//         );

//         // Get updated profile
//         const [updated] = await db.query(
//             `SELECT m.*, u.name, u.email
//        FROM mentors m
//        JOIN users u ON m.user_id = u.id
//        WHERE m.user_id = ?`, [userId]
//         );

//         res.json({
//             success: true,
//             message: 'Profile updated successfully',
//             data: updated[0]
//         });

//     } catch (error) {
//         console.error('Update mentor profile error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error updating profile'
//         });
//     }
// };

// // @desc    Check if mentor profile is completed
// // @route   GET /api/mentors/profile/status
// // @access  Private (Mentor only)
// exports.getProfileStatus = async(req, res) => {
//     try {
//         const userId = req.user.userId;

//         const [mentors] = await db.query(
//             `SELECT 
//         CASE 
//           WHEN expertise IS NOT NULL 
//           AND experience_years IS NOT NULL 
//           AND bio IS NOT NULL 
//           THEN TRUE 
//           ELSE FALSE 
//         END as profile_completed,
//         verified
//        FROM mentors 
//        WHERE user_id = ?`, [userId]
//         );

//         if (mentors.length === 0) {
//             return res.json({
//                 success: true,
//                 data: {
//                     profile_completed: false,
//                     verified: false,
//                     profile_exists: false
//                 }
//             });
//         }

//         res.json({
//             success: true,
//             data: {
//                 profile_completed: mentors[0].profile_completed === 1,
//                 verified: mentors[0].verified === 1,
//                 profile_exists: true
//             }
//         });

//     } catch (error) {
//         console.error('Get profile status error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error checking profile status'
//         });
//     }
// };


const db = require('../config/db');
const { createNotification } = require('./notificationController');

// @desc    Get all verified mentors
// @route   GET /api/mentors
// @access  Public
exports.getAllMentors = async(req, res) => {
    try {
        const { search, expertise } = req.query;

        let whereConditions = ['m.verified = TRUE'];
        let queryParams = [];

        // Search by name or expertise
        if (search) {
            whereConditions.push('(u.name LIKE ? OR m.expertise LIKE ?)');
            const searchPattern = `%${search}%`;
            queryParams.push(searchPattern, searchPattern);
        }

        // Filter by expertise
        if (expertise) {
            whereConditions.push('m.expertise LIKE ?');
            queryParams.push(`%${expertise}%`);
        }

        const whereClause = whereConditions.join(' AND ');

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
        (SELECT COUNT(*) FROM mentorship_requests WHERE mentor_id = m.id) as total_students
      FROM mentors m
      JOIN users u ON m.user_id = u.id
      WHERE ${whereClause}
      ORDER BY m.experience_years DESC`,
            queryParams
        );

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

// @desc    Get single mentor by ID
// @route   GET /api/mentors/:id
// @access  Public
exports.getMentorById = async(req, res) => {
    try {
        const { id } = req.params;

        const [mentors] = await db.query(
            `SELECT 
        m.*,
        u.name,
        u.email,
        (SELECT COUNT(*) FROM mentorship_requests WHERE mentor_id = m.id) as total_students
      FROM mentors m
      JOIN users u ON m.user_id = u.id
      WHERE m.id = ? AND m.verified = TRUE`, [id]
        );

        if (mentors.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Mentor not found'
            });
        }

        res.json({
            success: true,
            data: mentors[0]
        });

    } catch (error) {
        console.error('Get mentor error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching mentor details'
        });
    }
};

// @desc    Request mentor for scholarship
// @route   POST /api/mentors/request
// @access  Private (Student only)
exports.requestMentor = async(req, res) => {
    try {
        const studentId = req.user.userId;
        const { mentor_id, scholarship_id } = req.body;

        if (!mentor_id) {
            return res.status(400).json({
                success: false,
                message: 'Mentor ID is required'
            });
        }

        // Check if mentor exists and is verified, get mentor's user_id
        const [mentors] = await db.query(
            'SELECT id, user_id FROM mentors WHERE id = ? AND verified = TRUE', [mentor_id]
        );

        if (mentors.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Mentor not found or not verified'
            });
        }

        const mentorUserId = mentors[0].user_id;

        // Check if already requested
        const [existing] = await db.query(
            'SELECT id FROM mentorship_requests WHERE student_id = ? AND mentor_id = ?', [studentId, mentor_id]
        );

        if (existing.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'You have already requested this mentor'
            });
        }

        // Insert mentor_id (from mentors table)
        await db.query(
            'INSERT INTO mentorship_requests (student_id, mentor_id, scholarship_id) VALUES (?, ?, ?)', [studentId, mentor_id, scholarship_id || null]
        );

        // Get student name for notification
        const [student] = await db.query('SELECT name FROM users WHERE id = ?', [studentId]);
        // const studentName = student[0] ? .name || 'A student';
        //////////////added for formatting ///////////////////////////////////////////////////////
        //////////////added for formatting ///////////////////////////////////////////////////////
        //////////////added for formatting ///////////////////////////////////////////////////////
        //////////////added for formatting ///////////////////////////////////////////////////////
        const studentName = student.length > 0 && student[0].name ? student[0].name : 'A student'; //////////////added for formatting ////////////////////////////////////////////////////////
        // NOTIFICATION: Create notification for mentor
        await createNotification(
            mentorUserId,
            'mentor_request',
            `${studentName} sent you a mentorship request`,
            global.io
        );

        res.status(201).json({
            success: true,
            message: 'Mentor request sent successfully'
        });

    } catch (error) {
        console.error('Request mentor error:', error);
        res.status(500).json({
            success: false,
            message: 'Error sending mentor request'
        });
    }
};

// @desc    Get mentor's requests (for mentor dashboard)
// @route   GET /api/mentors/my-requests
// @access  Private (Mentor only)
exports.getMyRequests = async(req, res) => {
    try {
        const userId = req.user.userId;

        // Get the mentor_id from mentors table using user_id
        const [mentor] = await db.query(
            'SELECT id FROM mentors WHERE user_id = ?', [userId]
        );

        if (mentor.length === 0) {
            return res.json({
                success: true,
                data: []
            });
        }

        const mentorId = mentor[0].id;

        // Query using the correct mentor_id
        const [requests] = await db.query(
            `SELECT 
        mr.id,
        mr.status,
        mr.requested_at,
        u.name as student_name,
        u.email as student_email,
        s.title as scholarship_title
      FROM mentorship_requests mr
      JOIN users u ON mr.student_id = u.id
      LEFT JOIN scholarships s ON mr.scholarship_id = s.id
      WHERE mr.mentor_id = ?
      ORDER BY mr.requested_at DESC`, [mentorId]
        );

        res.json({
            success: true,
            data: requests
        });

    } catch (error) {
        console.error('Get requests error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching requests'
        });
    }
};

// @desc    Accept/Reject mentor request
// @route   PUT /api/mentors/requests/:id
// @access  Private (Mentor only)
exports.updateRequest = async(req, res) => {
    try {
        const userId = req.user.userId;
        const { id } = req.params;
        const { status } = req.body;

        if (!['accepted', 'rejected'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status'
            });
        }

        // Get mentor_id from mentors table first
        const [mentor] = await db.query(
            'SELECT id FROM mentors WHERE user_id = ?', [userId]
        );

        if (mentor.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Mentor not found'
            });
        }

        const mentorId = mentor[0].id;

        // Verify request belongs to this mentor and get student_id
        const [requests] = await db.query(
            'SELECT id, student_id FROM mentorship_requests WHERE id = ? AND mentor_id = ?', [id, mentorId]
        );

        if (requests.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Request not found'
            });
        }

        const studentId = requests[0].student_id;

        // Update request status
        await db.query(
            'UPDATE mentorship_requests SET status = ?, accepted_at = NOW() WHERE id = ?', [status, id]
        );

        // Get mentor name for notification
        const [mentorUser] = await db.query('SELECT name FROM users WHERE id = ?', [userId]);
        // const mentorName = mentorUser[0] ? .name || 'A mentor';
        const mentorName = mentorUser.length > 0 && mentorUser[0].name ? mentorUser[0].name : 'A mentor';
        //////////////////////////////////////////////////
        ////////////////////////////////////////////////
        ///////////////for formatting///////////////////////////////
        ////////////////////////////////////////////
        ////////////////////////////////////////////
        ////////////////////////////////
        // NOTIFICATION: Create notification for student
        const notifType = status === 'accepted' ? 'request_accepted' : 'request_rejected';
        const notifMessage = status === 'accepted' ?
            `${mentorName} accepted your mentorship request` :
            `${mentorName} rejected your mentorship request`;

        await createNotification(
            studentId,
            notifType,
            notifMessage,
            global.io
        );

        res.json({
            success: true,
            message: `Request ${status} successfully`
        });

    } catch (error) {
        console.error('Update request error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating request'
        });
    }
};

// @desc    Get mentor's own profile
// @route   GET /api/mentors/profile
// @access  Private (Mentor only)
exports.getMyProfile = async(req, res) => {
    try {
        const userId = req.user.userId;

        const [mentors] = await db.query(
            `SELECT 
        m.*,
        u.name,
        u.email
      FROM mentors m
      JOIN users u ON m.user_id = u.id
      WHERE m.user_id = ?`, [userId]
        );

        if (mentors.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Mentor profile not found'
            });
        }

        res.json({
            success: true,
            data: mentors[0]
        });

    } catch (error) {
        console.error('Get mentor profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching profile'
        });
    }
};

// @desc    Update mentor's own profile
// @route   PUT /api/mentors/profile
// @access  Private (Mentor only)
exports.updateMyProfile = async(req, res) => {
    try {
        const userId = req.user.userId;
        const { expertise, experience_years, bio, charge_per_session } = req.body;

        if (!expertise || !experience_years || !bio) {
            return res.status(400).json({
                success: false,
                message: 'Expertise, experience years, and bio are required'
            });
        }

        const [existing] = await db.query(
            'SELECT id FROM mentors WHERE user_id = ?', [userId]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Mentor profile not found'
            });
        }

        await db.query(
            `UPDATE mentors 
       SET expertise = ?,
           experience_years = ?,
           bio = ?,
           charge_per_session = ?
       WHERE user_id = ?`, [expertise, experience_years, bio, charge_per_session || 0, userId]
        );

        const [updated] = await db.query(
            `SELECT m.*, u.name, u.email
       FROM mentors m
       JOIN users u ON m.user_id = u.id
       WHERE m.user_id = ?`, [userId]
        );

        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: updated[0]
        });

    } catch (error) {
        console.error('Update mentor profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating profile'
        });
    }
};

// @desc    Check if mentor profile is completed
// @route   GET /api/mentors/profile/status
// @access  Private (Mentor only)
exports.getProfileStatus = async(req, res) => {
    try {
        const userId = req.user.userId;

        const [mentors] = await db.query(
            `SELECT 
        CASE 
          WHEN expertise IS NOT NULL 
          AND experience_years IS NOT NULL 
          AND bio IS NOT NULL 
          THEN TRUE 
          ELSE FALSE 
        END as profile_completed,
        verified
       FROM mentors 
       WHERE user_id = ?`, [userId]
        );

        if (mentors.length === 0) {
            return res.json({
                success: true,
                data: {
                    profile_completed: false,
                    verified: false,
                    profile_exists: false
                }
            });
        }

        res.json({
            success: true,
            data: {
                profile_completed: mentors[0].profile_completed === 1,
                verified: mentors[0].verified === 1,
                profile_exists: true
            }
        });

    } catch (error) {
        console.error('Get profile status error:', error);
        res.status(500).json({
            success: false,
            message: 'Error checking profile status'
        });
    }
};