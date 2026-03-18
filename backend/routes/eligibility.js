const express = require('express');
const router = express.Router();
const { getRecommendations, checkEligibility } = require('../controllers/eligibilityController');
const { protect } = require('../middleware/authMiddleware');

// All routes require authentication
router.get('/recommendations', protect, getRecommendations);
router.get('/check/:scholarshipId', protect, checkEligibility);

module.exports = router;