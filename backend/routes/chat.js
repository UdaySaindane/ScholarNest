// const express = require('express');
// const router = express.Router();
// const {
//     getChatMessages,
//     sendMessage,
//     getMyChats
// } = require('../controllers/chatController');
// const { protect } = require('../middleware/authMiddleware');

// // All routes require authentication
// router.get('/my-chats', protect, getMyChats);
// router.get('/:mentorshipId', protect, getChatMessages);
// router.post('/:mentorshipId', protect, sendMessage);

// module.exports = router;


const express = require('express');
const router = express.Router();
const {
    getChatMessages,
    sendMessage,
    getMyChats,
    getMyMentors // NEW
} = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

// Specific routes FIRST (before /:mentorshipId catches them)
router.get('/my-chats', protect, getMyChats);
router.get('/my-mentors', protect, getMyMentors); // NEW - student's accepted mentors

// Parameterized route LAST
router.get('/:mentorshipId', protect, getChatMessages);
router.post('/:mentorshipId', protect, sendMessage);

module.exports = router;