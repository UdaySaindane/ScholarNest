const express = require('express');
const router = express.Router();
const {
    createApplication,
    getMyApplications,
    getApplicationById,
    updateApplication,
    deleteApplication,
    checkApplication
} = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');
const { requireProfileCompleted } = require('../middleware/profileMiddleware');

// All routes require authentication
router.use(protect);

// Check if already applied (no profile required for checking)
router.get('/check/:scholarship_id', checkApplication);

// Create application (requires completed profile)
router.post('/', requireProfileCompleted, createApplication);

// Get all user's applications
router.get('/', getMyApplications);

// Get, update, delete specific application
router.get('/:id', getApplicationById);
router.put('/:id', updateApplication);
router.delete('/:id', deleteApplication);

module.exports = router;