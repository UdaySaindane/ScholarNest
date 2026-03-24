// const express = require('express');
// const router = express.Router();
// const {
//     getPendingMentors,
//     verifyMentor,
//     getAdminStats,
//     getAllStudents,
//     getAllMentors,
//     getAllApplications,
//     updateApplicationStatus,
//     getStudentDetails
// } = require('../controllers/adminController');
// const { protect } = require('../middleware/authMiddleware');
// const { requireAdmin } = require('../middleware/adminMiddleware');

// // All routes require admin authentication
// router.use(protect);
// router.use(requireAdmin);

// // Statistics
// router.get('/stats', getAdminStats);

// // Mentor verification
// router.get('/mentors/pending', getPendingMentors);
// router.put('/mentors/:id/verify', verifyMentor);

// // Students management
// router.get('/students', getAllStudents);
// router.get('/students/:id', getStudentDetails);

// // Mentors management
// router.get('/mentors', getAllMentors);

// // Applications management
// router.get('/applications', getAllApplications);
// router.put('/applications/:id/status', updateApplicationStatus);

// module.exports = router;

const express = require('express');
const router = express.Router();

// Import admin controllers
const {
    getPendingMentors,
    verifyMentor,
    getAdminStats,
    getAllStudents,
    getAllMentors,
    getAllApplications,
    updateApplicationStatus,
    getStudentDetails
} = require('../controllers/adminController');

// Import scholarship admin controller
const {
    getAllScholarshipsAdmin,
    getScholarshipByIdAdmin,
    addScholarship,
    updateScholarship,
    deleteScholarship,
    bulkUploadScholarships,
    banUser,
    getAllUsers,
    getUserActivity,
    getAllActivityLogs
} = require('../controllers/scholarshipAdminController');

const { protect } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/adminMiddleware');

// All routes require admin authentication
router.use(protect);
router.use(requireAdmin);

// ============ STATISTICS ============
router.get('/stats', getAdminStats);

// ============ MENTOR VERIFICATION ============
router.get('/mentors/pending', getPendingMentors);
router.put('/mentors/:id/verify', verifyMentor);

// ============ STUDENTS MANAGEMENT ============
router.get('/students', getAllStudents);
router.get('/students/:id', getStudentDetails);

// ============ MENTORS MANAGEMENT ============
router.get('/mentors', getAllMentors);

// ============ APPLICATIONS MANAGEMENT ============
router.get('/applications', getAllApplications);
router.put('/applications/:id/status', updateApplicationStatus);

// ============ SCHOLARSHIP MANAGEMENT ============
router.get('/scholarships', getAllScholarshipsAdmin);
router.get('/scholarships/:id', getScholarshipByIdAdmin);
router.post('/scholarships', addScholarship);
router.put('/scholarships/:id', updateScholarship);
router.delete('/scholarships/:id', deleteScholarship);
router.post('/scholarships/bulk-upload', bulkUploadScholarships);

// ============ USER MANAGEMENT ============
router.get('/users', getAllUsers);
router.put('/users/:id/ban', banUser);
router.get('/users/:id/activity', getUserActivity);

// ============ ACTIVITY LOGS ============
router.get('/activity-logs', getAllActivityLogs);

module.exports = router;