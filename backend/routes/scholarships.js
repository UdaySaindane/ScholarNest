const express = require('express');
const router = express.Router();
const {
    getAllScholarships,
    getScholarshipById,
    getScholarshipStats
} = require('../controllers/scholarshipController');

// Public routes
router.get('/', getAllScholarships);
router.get('/stats', getScholarshipStats);
router.get('/:id', getScholarshipById);

module.exports = router;