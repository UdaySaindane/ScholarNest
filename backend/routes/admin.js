// const express = require('express');
// const router = express.Router();
// const {
//     getPendingMentors,
//     verifyMentor,
//     getAdminStats
// } = require('../controllers/adminController');
// const { protect } = require('../middleware/authMiddleware');
// const { requireAdmin } = require('../middleware/adminMiddleware');

// // All admin routes require authentication AND admin role
// router.use(protect);
// router.use(requireAdmin);

// router.get('/stats', getAdminStats);
// router.get('/mentors/pending', getPendingMentors);
// router.put('/mentors/:id/verify', verifyMentor);

// module.exports = router;

const express = require('express');
const router = express.Router();
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
const { protect } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/adminMiddleware');

// All routes require admin authentication
router.use(protect);
router.use(requireAdmin);

// Statistics
router.get('/stats', getAdminStats);

// Mentor verification
router.get('/mentors/pending', getPendingMentors);
router.put('/mentors/:id/verify', verifyMentor);

// Students management
router.get('/students', getAllStudents);
router.get('/students/:id', getStudentDetails);

// Mentors management
router.get('/mentors', getAllMentors);

// Applications management
router.get('/applications', getAllApplications);
router.put('/applications/:id/status', updateApplicationStatus);

module.exports = router;