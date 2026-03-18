// const express = require('express');
// const router = express.Router();
// const {
//     getAllMentors,
//     getMentorById,
//     requestMentor,
//     getMyRequests,
//     updateRequest,
//     getMyProfile,
//     updateMyProfile,
//     getProfileStatus
// } = require('../controllers/mentorController');
// const { protect } = require('../middleware/authMiddleware');

// // Public routes
// router.get('/', getAllMentors);

// // Protected routes (require login) - MUST be before /:id
// router.post('/request', protect, requestMentor);
// router.get('/my-requests', protect, getMyRequests);
// router.put('/requests/:id', protect, updateRequest);

// // Mentor profile routes - MUST be before /:id
// router.get('/profile/status', protect, getProfileStatus);
// router.get('/profile', protect, getMyProfile);
// router.put('/profile', protect, updateMyProfile);

// // /:id MUST be last - it catches everything after it
// router.get('/:id', getMentorById);

// module.exports = router;

///////////////////////////////////////////
///////////////////////////////////////////

///////////////////////////////////////////

///////////////////////////////////////////
// above is latest 18/02/25
///////////////////////////////////////////

///////////////////////////////////////////

///////////////////////////////////////////

///////////////////////////////////////////

///////////////////////////////////////////
// const express = require('express');
// const router = express.Router();
// const {
//     getAllMentors,
//     getMentorById,
//     requestMentor,
//     getMyRequests,
//     updateRequest,
//     getMyProfile,
//     updateMyProfile,
//     getProfileStatus
// } = require('../controllers/mentorController');
// const { protect } = require('../middleware/authMiddleware');
// const db = require('../config/db');

// // Public routes
// router.get('/', getAllMentors);

// // Protected routes (require login) - MUST be before /:id
// router.post('/request', protect, requestMentor);
// router.get('/my-requests', protect, getMyRequests);

// // NEW ROUTE - Get connected mentors (for highlighting on mentors page)
// router.get('/my-mentors', protect, (req, res) => {
//     try {
//         if (req.user.role !== 'student') {
//             return res.status(403).json({
//                 success: false,
//                 message: 'Only students can access this endpoint'
//             });
//         }

//         const query = `
//             SELECT 
//                 mr.id,
//                 mr.mentor_id,
//                 mr.student_id,
//                 mr.status,
//                 mr.created_at,
//                 m.name as mentor_name,
//                 m.email as mentor_email,
//                 m.expertise,
//                 m.experience_years,
//                 m.bio,
//                 m.charge_per_session,
//                 m.verified,
//                 m.total_students
//             FROM mentorship_requests mr
//             INNER JOIN mentors m ON mr.mentor_id = m.id
//             WHERE mr.student_id = ? AND mr.status = 'accepted'
//             ORDER BY mr.created_at DESC
//         `;

//         db.query(query, [req.user.userId], (err, results) => {
//             if (err) {
//                 console.error('Database error:', err);
//                 return res.status(500).json({
//                     success: false,
//                     message: 'Failed to fetch connected mentors'
//                 });
//             }

//             res.json({
//                 success: true,
//                 data: results
//             });
//         });
//     } catch (error) {
//         console.error('Get my mentors error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Server error'
//         });
//     }
// });

// router.put('/requests/:id', protect, updateRequest);

// // Mentor profile routes - MUST be before /:id
// router.get('/profile/status', protect, getProfileStatus);
// router.get('/profile', protect, getMyProfile);
// router.put('/profile', protect, updateMyProfile);

// // /:id MUST be last - it catches everything after it
// router.get('/:id', getMentorById);

// module.exports = router;


///////////////////////////////////////////
///////////////////////////////////////////

///////////////////////////////////////////

///////////////////////////////////////////
// above is of 19/02/25
///////////////////////////////////////////

///////////////////////////////////////////

///////////////////////////////////////////

///////////////////////////////////////////

///////////////////////////////////////////

const express = require('express');
const router = express.Router();
const {
    getAllMentors,
    getMentorById,
    requestMentor,
    getMyRequests,
    updateRequest,
    getMyProfile,
    updateMyProfile,
    getProfileStatus
} = require('../controllers/mentorController');
const { protect } = require('../middleware/authMiddleware');
const db = require('../config/db');

// Public routes
router.get('/', getAllMentors);

// Protected routes (require login) - MUST be before /:id
router.post('/request', protect, requestMentor);
router.get('/my-requests', protect, getMyRequests);

// NEW ROUTE - Get connected mentors (for highlighting on mentors page)
router.get('/my-mentors', protect, (req, res) => {
    // Check if user is student
    if (req.user.role !== 'student') {
        return res.status(403).json({
            success: false,
            message: 'Only students can access this endpoint'
        });
    }

    // Handle both userId and id field names
    const studentId = req.user.userId || req.user.id;

    if (!studentId) {
        console.error('No user ID found in token:', req.user);
        return res.status(400).json({
            success: false,
            message: 'Invalid user token'
        });
    }

    const query = `
        SELECT 
            mr.id,
            mr.mentor_id,
            mr.student_id,
            mr.status,
            mr.created_at
        FROM mentorship_requests mr
        WHERE mr.student_id = ? AND mr.status = 'accepted'
        ORDER BY mr.created_at DESC
    `;

    db.query(query, [studentId], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch connected mentors'
            });
        }

        console.log('Connected mentors found:', results.length);
        res.json({
            success: true,
            data: results
        });
    });
});

router.put('/requests/:id', protect, updateRequest);

// Mentor profile routes - MUST be before /:id
router.get('/profile/status', protect, getProfileStatus);
router.get('/profile', protect, getMyProfile);
router.put('/profile', protect, updateMyProfile);

// /:id MUST be last - it catches everything after it
router.get('/:id', getMentorById);

module.exports = router;