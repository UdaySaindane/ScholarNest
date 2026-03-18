// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const db = require('../config/db');

// // Generate JWT Token
// const generateToken = (userId, email, role) => {
//     return jwt.sign({ userId, email, role },
//         process.env.JWT_SECRET, { expiresIn: '7d' } // Token valid for 7 days
//     );
// };

// // @desc    Register new user
// // @route   POST /api/auth/register
// // @access  Public
// exports.register = async(req, res) => {
//     try {
//         const { name, email, password, role } = req.body;

//         // Validation
//         if (!name || !email || !password) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Please provide name, email, and password'
//             });
//         }

//         // Email format validation
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Please provide a valid email'
//             });
//         }

//         // Password length check
//         if (password.length < 6) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Password must be at least 6 characters'
//             });
//         }

//         // Check if user already exists
//         const [existingUsers] = await db.query(
//             'SELECT id FROM users WHERE email = ?', [email]
//         );

//         if (existingUsers.length > 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Email already registered'
//             });
//         }

//         // Hash password
//         const salt = await bcrypt.genSalt(10);
//         const password_hash = await bcrypt.hash(password, salt);

//         // Insert user
//         const [result] = await db.query(
//             'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)', [name, email, password_hash, role || 'student']
//         );

//         const userId = result.insertId;

//         // Generate token
//         const token = generateToken(userId, email, role || 'student');

//         res.status(201).json({
//             success: true,
//             message: 'User registered successfully',
//             data: {
//                 userId,
//                 name,
//                 email,
//                 role: role || 'student',
//                 token
//             }
//         });

//     } catch (error) {
//         console.error('Register error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Server error during registration'
//         });
//     }
// };

// // @desc    Login user
// // @route   POST /api/auth/login
// // @access  Public
// exports.login = async(req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Validation
//         if (!email || !password) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Please provide email and password'
//             });
//         }

//         // Find user
//         const [users] = await db.query(
//             'SELECT id, name, email, password_hash, role FROM users WHERE email = ?', [email]
//         );

//         if (users.length === 0) {
//             return res.status(401).json({
//                 success: false,
//                 message: 'Invalid email or password'
//             });
//         }

//         const user = users[0];

//         // Check password
//         const isPasswordValid = await bcrypt.compare(password, user.password_hash);

//         if (!isPasswordValid) {
//             return res.status(401).json({
//                 success: false,
//                 message: 'Invalid email or password'
//             });
//         }

//         // Generate token
//         const token = generateToken(user.id, user.email, user.role);

//         res.json({
//             success: true,
//             message: 'Login successful',
//             data: {
//                 userId: user.id,
//                 name: user.name,
//                 email: user.email,
//                 role: user.role,
//                 token
//             }
//         });

//     } catch (error) {
//         console.error('Login error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Server error during login'
//         });
//     }
// };

// // @desc    Get current user
// // @route   GET /api/auth/me
// // @access  Private
// exports.getMe = async(req, res) => {
//     try {
//         const [users] = await db.query(
//             'SELECT id, name, email, role, created_at FROM users WHERE id = ?', [req.user.userId]
//         );

//         if (users.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'User not found'
//             });
//         }

//         res.json({
//             success: true,
//             data: users[0]
//         });

//     } catch (error) {
//         console.error('Get me error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Server error'
//         });
//     }
// };]

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Generate JWT Token
const generateToken = (userId, email, role) => {
    return jwt.sign({ userId, email, role },
        process.env.JWT_SECRET, { expiresIn: '7d' }
    );
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async(req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email, and password'
            });
        }

        // Prevent admin registration
        if (role === 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Admin accounts cannot be created through registration'
            });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email'
            });
        }

        // Password length check
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters'
            });
        }

        // Check if user already exists
        const [existingUsers] = await db.query(
            'SELECT id FROM users WHERE email = ?', [email]
        );

        if (existingUsers.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Insert user
        const [result] = await db.query(
            'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)', [name, email, password_hash, role || 'student']
        );

        const userId = result.insertId;

        // If registering as mentor, create mentor profile
        if (role === 'mentor') {
            await db.query(
                'INSERT INTO mentors (user_id, verified) VALUES (?, FALSE)', [userId]
            );
        }

        // Generate token
        const token = generateToken(userId, email, role || 'student');

        res.status(201).json({
            success: true,
            message: role === 'mentor' ?
                'Mentor account created. Pending admin verification.' : 'User registered successfully',
            data: {
                userId,
                name,
                email,
                role: role || 'student',
                token
            }
        });

    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during registration'
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        // Find user
        const [users] = await db.query(
            'SELECT id, name, email, password_hash, role FROM users WHERE email = ?', [email]
        );

        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const user = users[0];

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Generate token
        const token = generateToken(user.id, user.email, user.role);

        res.json({
            success: true,
            message: 'Login successful',
            data: {
                userId: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during login'
        });
    }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async(req, res) => {
    try {
        const [users] = await db.query(
            'SELECT id, name, email, role, created_at FROM users WHERE id = ?', [req.user.userId]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            data: users[0]
        });

    } catch (error) {
        console.error('Get me error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};