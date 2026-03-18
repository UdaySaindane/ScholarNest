// const db = require('../config/db');

// /*
//  * Your actual chat_messages table:
//  *   id            int (AI, PK)
//  *   from_user_id  int
//  *   to_user_id    int
//  *   message       text
//  *   sent_at       timestamp
//  *   read_status   tinyint(1)
//  *
//  * No mentorship_id column. Messages are user-to-user.
//  * We look up the two user IDs from mentorship_requests,
//  * then query/insert messages using from_user_id + to_user_id.
//  */

// // Helper: get the student and mentor user IDs for a mentorship
// async function getMentorshipUsers(mentorshipId) {
//     const [rows] = await db.query(
//         `SELECT mr.student_id, m.user_id as mentor_user_id
//          FROM mentorship_requests mr
//          JOIN mentors m ON mr.mentor_id = m.id
//          WHERE mr.id = ? AND mr.status = 'accepted'`, [mentorshipId]
//     );
//     return rows.length > 0 ? rows[0] : null;
// }

// // GET /api/chat/:mentorshipId
// const getChatMessages = async(req, res) => {
//     try {
//         const { mentorshipId } = req.params;
//         const userId = req.user.userId;

//         const mentorship = await getMentorshipUsers(mentorshipId);
//         if (!mentorship) {
//             return res.status(404).json({ success: false, message: 'Mentorship not found or not accepted' });
//         }

//         // == not !== so string/number from DB doesn't break it
//         if (userId != mentorship.student_id && userId != mentorship.mentor_user_id) {
//             return res.status(403).json({ success: false, message: 'Access denied' });
//         }

//         const userA = mentorship.student_id;
//         const userB = mentorship.mentor_user_id;

//         // All messages between these two users, both directions
//         const [messages] = await db.query(
//             `SELECT
//                 cm.id,
//                 cm.from_user_id as sender_id,
//                 cm.to_user_id,
//                 cm.message,
//                 cm.sent_at as created_at,
//                 cm.read_status,
//                 u.name as sender_name,
//                 u.role as sender_role
//             FROM chat_messages cm
//             JOIN users u ON cm.from_user_id = u.id
//             WHERE (cm.from_user_id = ? AND cm.to_user_id = ?)
//                OR (cm.from_user_id = ? AND cm.to_user_id = ?)
//             ORDER BY cm.sent_at ASC`, [userA, userB, userB, userA]
//         );

//         res.json({ success: true, data: messages });
//     } catch (error) {
//         console.error('Get chat messages error:', error);
//         res.status(500).json({ success: false, message: 'Error fetching messages' });
//     }
// };

// // POST /api/chat/:mentorshipId
// const sendMessage = async(req, res) => {
//     try {
//         const { mentorshipId } = req.params;
//         const { message } = req.body;
//         const userId = req.user.userId;

//         if (!message || message.trim() === '') {
//             return res.status(400).json({ success: false, message: 'Message cannot be empty' });
//         }

//         const mentorship = await getMentorshipUsers(mentorshipId);
//         if (!mentorship) {
//             return res.status(404).json({ success: false, message: 'Mentorship not found or not accepted' });
//         }

//         if (userId != mentorship.student_id && userId != mentorship.mentor_user_id) {
//             return res.status(403).json({ success: false, message: 'Access denied' });
//         }

//         // The recipient is the OTHER person in the mentorship
//         const toUserId = (userId == mentorship.student_id) ?
//             mentorship.mentor_user_id :
//             mentorship.student_id;

//         // INSERT using your actual columns
//         const [result] = await db.query(
//             `INSERT INTO chat_messages (from_user_id, to_user_id, message, read_status) VALUES (?, ?, ?, 0)`, [userId, toUserId, message.trim()]
//         );

//         // Return the saved message with sender info
//         const [newMessage] = await db.query(
//             `SELECT
//                 cm.id,
//                 cm.from_user_id as sender_id,
//                 cm.to_user_id,
//                 cm.message,
//                 cm.sent_at as created_at,
//                 cm.read_status,
//                 u.name as sender_name,
//                 u.role as sender_role
//             FROM chat_messages cm
//             JOIN users u ON cm.from_user_id = u.id
//             WHERE cm.id = ?`, [result.insertId]
//         );

//         res.json({ success: true, data: newMessage[0] });
//     } catch (error) {
//         console.error('Send message error:', error);
//         res.status(500).json({ success: false, message: 'Error sending message' });
//     }
// };

// // GET /api/chat/my-chats
// const getMyChats = async(req, res) => {
//     try {
//         const userId = req.user.userId;
//         const userRole = req.user.role;

//         let query;
//         if (userRole === 'student') {
//             query = `
//                 SELECT
//                     mr.id as mentorship_id,
//                     mu.id as other_user_id,
//                     mu.name as other_user_name,
//                     mu.email as other_user_email,
//                     'mentor' as other_user_role
//                 FROM mentorship_requests mr
//                 JOIN mentors m ON mr.mentor_id = m.id
//                 JOIN users mu ON m.user_id = mu.id
//                 WHERE mr.student_id = ? AND mr.status = 'accepted'`;
//         } else if (userRole === 'mentor') {
//             query = `
//                 SELECT
//                     mr.id as mentorship_id,
//                     su.id as other_user_id,
//                     su.name as other_user_name,
//                     su.email as other_user_email,
//                     'student' as other_user_role
//                 FROM mentorship_requests mr
//                 JOIN mentors m ON mr.mentor_id = m.id
//                 JOIN users su ON mr.student_id = su.id
//                 WHERE m.user_id = ? AND mr.status = 'accepted'`;
//         } else {
//             return res.status(403).json({ success: false, message: 'Access denied' });
//         }

//         const [chats] = await db.query(query, [userId]);
//         res.json({ success: true, data: chats });
//     } catch (error) {
//         console.error('Get my chats error:', error);
//         res.status(500).json({ success: false, message: 'Error fetching chats' });
//     }
// };

// // GET /api/chat/my-mentors  (student's accepted mentors for "My Mentors" tab)
// const getMyMentors = async(req, res) => {
//     try {
//         const userId = req.user.userId;

//         const [mentorships] = await db.query(
//             `SELECT
//                 mr.id,
//                 mr.status,
//                 mr.requested_at,
//                 u.name as mentor_name,
//                 u.email as mentor_email,
//                 s.title as scholarship_title
//             FROM mentorship_requests mr
//             JOIN mentors m ON mr.mentor_id = m.id
//             JOIN users u ON m.user_id = u.id
//             LEFT JOIN scholarships s ON mr.scholarship_id = s.id
//             WHERE mr.student_id = ? AND mr.status = 'accepted'
//             ORDER BY mr.requested_at DESC`, [userId]
//         );

//         res.json({ success: true, data: mentorships });
//     } catch (error) {
//         console.error('Get my mentors error:', error);
//         res.status(500).json({ success: false, message: 'Error fetching mentors' });
//     }
// };

// module.exports = {
//     getChatMessages,
//     sendMessage,
//     getMyChats,
//     getMyMentors
// };


const db = require('../config/db');
const { createNotification } = require('./notificationController');

// Helper: get the student and mentor user IDs for a mentorship
async function getMentorshipUsers(mentorshipId) {
    const [rows] = await db.query(
        `SELECT mr.student_id, m.user_id as mentor_user_id
         FROM mentorship_requests mr
         JOIN mentors m ON mr.mentor_id = m.id
         WHERE mr.id = ? AND mr.status = 'accepted'`, [mentorshipId]
    );
    return rows.length > 0 ? rows[0] : null;
}

// GET /api/chat/:mentorshipId
const getChatMessages = async(req, res) => {
    try {
        const { mentorshipId } = req.params;
        const userId = req.user.userId;

        const mentorship = await getMentorshipUsers(mentorshipId);
        if (!mentorship) {
            return res.status(404).json({ success: false, message: 'Mentorship not found or not accepted' });
        }

        if (userId != mentorship.student_id && userId != mentorship.mentor_user_id) {
            return res.status(403).json({ success: false, message: 'Access denied' });
        }

        const userA = mentorship.student_id;
        const userB = mentorship.mentor_user_id;

        const [messages] = await db.query(
            `SELECT
                cm.id,
                cm.from_user_id as sender_id,
                cm.to_user_id,
                cm.message,
                cm.sent_at as created_at,
                cm.read_status,
                u.name as sender_name,
                u.role as sender_role
            FROM chat_messages cm
            JOIN users u ON cm.from_user_id = u.id
            WHERE (cm.from_user_id = ? AND cm.to_user_id = ?)
               OR (cm.from_user_id = ? AND cm.to_user_id = ?)
            ORDER BY cm.sent_at ASC`, [userA, userB, userB, userA]
        );

        res.json({ success: true, data: messages });
    } catch (error) {
        console.error('Get chat messages error:', error);
        res.status(500).json({ success: false, message: 'Error fetching messages' });
    }
};

// POST /api/chat/:mentorshipId
const sendMessage = async(req, res) => {
    try {
        const { mentorshipId } = req.params;
        const { message } = req.body;
        const userId = req.user.userId;

        if (!message || message.trim() === '') {
            return res.status(400).json({ success: false, message: 'Message cannot be empty' });
        }

        const mentorship = await getMentorshipUsers(mentorshipId);
        if (!mentorship) {
            return res.status(404).json({ success: false, message: 'Mentorship not found or not accepted' });
        }

        if (userId != mentorship.student_id && userId != mentorship.mentor_user_id) {
            return res.status(403).json({ success: false, message: 'Access denied' });
        }

        // The recipient is the OTHER person in the mentorship
        const toUserId = (userId == mentorship.student_id) ?
            mentorship.mentor_user_id :
            mentorship.student_id;

        // INSERT using actual columns
        const [result] = await db.query(
            `INSERT INTO chat_messages (from_user_id, to_user_id, message, read_status) VALUES (?, ?, ?, 0)`, [userId, toUserId, message.trim()]
        );

        // Return the saved message with sender info
        const [newMessage] = await db.query(
            `SELECT
                cm.id,
                cm.from_user_id as sender_id,
                cm.to_user_id,
                cm.message,
                cm.sent_at as created_at,
                cm.read_status,
                u.name as sender_name,
                u.role as sender_role
            FROM chat_messages cm
            JOIN users u ON cm.from_user_id = u.id
            WHERE cm.id = ?`, [result.insertId]
        );

        // NOTIFICATION: Create notification for recipient
        const [sender] = await db.query('SELECT name FROM users WHERE id = ?', [userId]);
        // const senderName = sender[0] ? .name || 'Someone';

        const senderName = sender.length > 0 && sender[0].name ? sender[0].name : 'Someone';
        /////////////////////////////////////////////////
        ////////////////////////////////////////////////
        ///////////////for formatting///////////////////////////////
        ////////////////////////////////////////////
        ////////////////////////////////////////////
        ////////////////////////////////
        await createNotification(
            toUserId,
            'new_message',
            `You have a new message from ${senderName}`,
            global.io
        );

        res.json({ success: true, data: newMessage[0] });
    } catch (error) {
        console.error('Send message error:', error);
        res.status(500).json({ success: false, message: 'Error sending message' });
    }
};

// GET /api/chat/my-chats
const getMyChats = async(req, res) => {
    try {
        const userId = req.user.userId;
        const userRole = req.user.role;

        let query;
        if (userRole === 'student') {
            query = `
                SELECT
                    mr.id as mentorship_id,
                    mu.id as other_user_id,
                    mu.name as other_user_name,
                    mu.email as other_user_email,
                    'mentor' as other_user_role
                FROM mentorship_requests mr
                JOIN mentors m ON mr.mentor_id = m.id
                JOIN users mu ON m.user_id = mu.id
                WHERE mr.student_id = ? AND mr.status = 'accepted'`;
        } else if (userRole === 'mentor') {
            query = `
                SELECT
                    mr.id as mentorship_id,
                    su.id as other_user_id,
                    su.name as other_user_name,
                    su.email as other_user_email,
                    'student' as other_user_role
                FROM mentorship_requests mr
                JOIN mentors m ON mr.mentor_id = m.id
                JOIN users su ON mr.student_id = su.id
                WHERE m.user_id = ? AND mr.status = 'accepted'`;
        } else {
            return res.status(403).json({ success: false, message: 'Access denied' });
        }

        const [chats] = await db.query(query, [userId]);
        res.json({ success: true, data: chats });
    } catch (error) {
        console.error('Get my chats error:', error);
        res.status(500).json({ success: false, message: 'Error fetching chats' });
    }
};

// GET /api/chat/my-mentors (student's accepted mentors for "My Mentors" tab)
const getMyMentors = async(req, res) => {
    try {
        const userId = req.user.userId;

        const [mentorships] = await db.query(
            `SELECT
                mr.id,
                mr.status,
                mr.requested_at,
                u.name as mentor_name,
                u.email as mentor_email,
                s.title as scholarship_title
            FROM mentorship_requests mr
            JOIN mentors m ON mr.mentor_id = m.id
            JOIN users u ON m.user_id = u.id
            LEFT JOIN scholarships s ON mr.scholarship_id = s.id
            WHERE mr.student_id = ? AND mr.status = 'accepted'
            ORDER BY mr.requested_at DESC`, [userId]
        );

        res.json({ success: true, data: mentorships });
    } catch (error) {
        console.error('Get my mentors error:', error);
        res.status(500).json({ success: false, message: 'Error fetching mentors' });
    }
};

module.exports = {
    getChatMessages,
    sendMessage,
    getMyChats,
    getMyMentors
};