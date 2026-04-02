////////////////////////////////////////
////////////////////////////////////////

////////////////////////////////////////
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const db = require('./config/db');

const app = express();
const server = http.createServer(app);

// Socket.IO setup with CORS
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

// Middleware
// app.use(cors());
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://scholarnest-scholarships.netlify.app'
    ],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection
db.query('SELECT 1')
    .then(() => {
        console.log('✅ Database connected successfully!');
    })
    .catch((err) => {
        console.error('❌ Database connection failed:', err);
    });

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/scholarships', require('./routes/scholarships'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/mentors', require('./routes/mentors'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/notifications', require('./routes/notifications')); // NEW
app.use('/api/eligibility', require('./routes/eligibility'));
// Health check route
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Socket.IO connection handling
const activeUsers = new Map();

io.on('connection', (socket) => {
    console.log('🔌 User connected:', socket.id);

    // User joins with their userId
    socket.on('user:join', (userId) => {
        activeUsers.set(userId, socket.id);
        socket.userId = userId;
        console.log(`✅ User ${userId} joined with socket ${socket.id}`);
        io.emit('user:online', userId);
    });

    // Join a specific chat room
    socket.on('chat:join', (mentorshipId) => {
        socket.join(`chat_${mentorshipId}`);
        console.log(`📨 User ${socket.userId} joined chat room: chat_${mentorshipId}`);
    });

    // Leave a chat room
    socket.on('chat:leave', (mentorshipId) => {
        socket.leave(`chat_${mentorshipId}`);
        console.log(`🚪 User ${socket.userId} left chat room: chat_${mentorshipId}`);
    });

    // Send message
    socket.on('chat:message', (data) => {
        const { mentorshipId, message, senderId, senderName, senderRole } = data;

        io.to(`chat_${mentorshipId}`).emit('chat:newMessage', {
            id: Date.now(),
            mentorship_id: mentorshipId,
            sender_id: senderId,
            sender_name: senderName,
            sender_role: senderRole,
            message: message,
            created_at: new Date().toISOString()
        });

        console.log(`💬 Message in chat_${mentorshipId} from user ${senderId}`);
    });

    // Typing indicator
    socket.on('chat:typing', (data) => {
        const { mentorshipId, userId, userName, isTyping } = data;
        socket.to(`chat_${mentorshipId}`).emit('chat:userTyping', {
            userId,
            userName,
            isTyping
        });
    });

    // Disconnect
    socket.on('disconnect', () => {
        if (socket.userId) {
            activeUsers.delete(socket.userId);
            io.emit('user:offline', socket.userId);
            console.log(`❌ User ${socket.userId} disconnected`);
        } else {
            console.log('❌ User disconnected:', socket.id);
        }
    });
});

// Make io accessible in routes and controllers
app.set('io', io);
global.io = io; // Make available globally for controllers

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 http://localhost:${PORT}`);
    console.log(`🔌 Socket.IO ready for connections`);
});
////////////////////////////////////////

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

////////////////////////////////////////

////////////////////////////////////////

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

////////////////////////////////////////

////////////////////////////////////////

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

////////////////////////////////////////

////////////////////////////////////////

////////////////////////////////////////