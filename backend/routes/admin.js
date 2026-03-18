const express = require('express');
const router = express.Router();
const {
    getPendingMentors,
    verifyMentor,
    getAdminStats
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/adminMiddleware');

// All admin routes require authentication AND admin role
router.use(protect);
router.use(requireAdmin);

router.get('/stats', getAdminStats);
router.get('/mentors/pending', getPendingMentors);
router.put('/mentors/:id/verify', verifyMentor);

module.exports = router;