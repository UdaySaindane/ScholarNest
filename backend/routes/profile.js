const express = require('express');
const router = express.Router();
const {
    getProfile,
    createOrUpdateProfile,
    getProfileStatus,
    deleteProfile
} = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(protect);

router.get('/', getProfile);
router.post('/', createOrUpdateProfile);
router.get('/status', getProfileStatus);
router.delete('/', deleteProfile);

module.exports = router;