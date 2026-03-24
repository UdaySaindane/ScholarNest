// const db = require('../config/db');

// // @desc    Get all scholarships (admin view with stats)
// // @route   GET /api/admin/scholarships
// // @access  Private (Admin only)
// exports.getAllScholarshipsAdmin = async(req, res) => {
//     try {
//         const [scholarships] = await db.query(`
//       SELECT 
//         s.*,
//         (SELECT COUNT(*) FROM applications WHERE scholarship_id = s.id) as total_applications,
//         (SELECT COUNT(*) FROM applications WHERE scholarship_id = s.id AND status = 'won') as won_count
//       FROM scholarships s
//       ORDER BY s.created_at DESC
//     `);

//         res.json({
//             success: true,
//             data: scholarships
//         });
//     } catch (error) {
//         console.error('Get scholarships error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error fetching scholarships'
//         });
//     }
// };

// // @desc    Get single scholarship by ID
// // @route   GET /api/admin/scholarships/:id
// // @access  Private (Admin only)
// exports.getScholarshipByIdAdmin = async(req, res) => {
//     try {
//         const { id } = req.params;

//         const [scholarships] = await db.query(`
//       SELECT 
//         s.*,
//         (SELECT COUNT(*) FROM applications WHERE scholarship_id = s.id) as total_applications
//       FROM scholarships s
//       WHERE s.id = ?
//     `, [id]);

//         if (scholarships.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Scholarship not found'
//             });
//         }

//         res.json({
//             success: true,
//             data: scholarships[0]
//         });
//     } catch (error) {
//         console.error('Get scholarship error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error fetching scholarship'
//         });
//     }
// };

// // @desc    Add new scholarship
// // @route   POST /api/admin/scholarships
// // @access  Private (Admin only)
// exports.addScholarship = async(req, res) => {
//     try {
//         const {
//             title,
//             description,
//             amount,
//             deadline,
//             eligibility,
//             provider,
//             category,
//             education_level,
//             gender,
//             min_percentage,
//             max_income,
//             apply_link
//         } = req.body;

//         // Validation
//         if (!title || !description || !amount || !deadline || !provider) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Please provide all required fields'
//             });
//         }

//         const [result] = await db.query(
//             `INSERT INTO scholarships 
//       (title, description, amount, deadline, eligibility, provider, category, 
//        education_level, gender, min_percentage, max_income, apply_link) 
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
//                 title,
//                 description,
//                 amount,
//                 deadline,
//                 eligibility || null,
//                 provider,
//                 category || null,
//                 education_level || null,
//                 gender || null,
//                 min_percentage || null,
//                 max_income || null,
//                 apply_link || null
//             ]
//         );

//         res.status(201).json({
//             success: true,
//             message: 'Scholarship added successfully',
//             data: { id: result.insertId }
//         });
//     } catch (error) {
//         console.error('Add scholarship error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error adding scholarship'
//         });
//     }
// };

// // @desc    Update scholarship
// // @route   PUT /api/admin/scholarships/:id
// // @access  Private (Admin only)
// exports.updateScholarship = async(req, res) => {
//     try {
//         const { id } = req.params;
//         const {
//             title,
//             description,
//             amount,
//             deadline,
//             eligibility,
//             provider,
//             category,
//             education_level,
//             gender,
//             min_percentage,
//             max_income,
//             apply_link
//         } = req.body;

//         // Check if scholarship exists
//         const [existing] = await db.query('SELECT id FROM scholarships WHERE id = ?', [id]);
//         if (existing.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Scholarship not found'
//             });
//         }

//         await db.query(
//             `UPDATE scholarships 
//       SET title = ?, description = ?, amount = ?, deadline = ?, eligibility = ?, 
//           provider = ?, category = ?, education_level = ?, gender = ?, 
//           min_percentage = ?, max_income = ?, apply_link = ?
//       WHERE id = ?`, [
//                 title,
//                 description,
//                 amount,
//                 deadline,
//                 eligibility || null,
//                 provider,
//                 category || null,
//                 education_level || null,
//                 gender || null,
//                 min_percentage || null,
//                 max_income || null,
//                 apply_link || null,
//                 id
//             ]
//         );

//         res.json({
//             success: true,
//             message: 'Scholarship updated successfully'
//         });
//     } catch (error) {
//         console.error('Update scholarship error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error updating scholarship'
//         });
//     }
// };

// // @desc    Delete scholarship
// // @route   DELETE /api/admin/scholarships/:id
// // @access  Private (Admin only)
// exports.deleteScholarship = async(req, res) => {
//     try {
//         const { id } = req.params;

//         // Check if scholarship exists
//         const [existing] = await db.query('SELECT id FROM scholarships WHERE id = ?', [id]);
//         if (existing.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Scholarship not found'
//             });
//         }

//         // Delete scholarship (applications will be handled by CASCADE or you can delete manually)
//         await db.query('DELETE FROM scholarships WHERE id = ?', [id]);

//         res.json({
//             success: true,
//             message: 'Scholarship deleted successfully'
//         });
//     } catch (error) {
//         console.error('Delete scholarship error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error deleting scholarship'
//         });
//     }
// };

// // @desc    Bulk upload scholarships via CSV
// // @route   POST /api/admin/scholarships/bulk-upload
// // @access  Private (Admin only)
// exports.bulkUploadScholarships = async(req, res) => {
//     try {
//         const { scholarships } = req.body; // Array of scholarship objects

//         if (!Array.isArray(scholarships) || scholarships.length === 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Please provide scholarships array'
//             });
//         }

//         let successCount = 0;
//         let failCount = 0;
//         const errors = [];

//         for (const scholarship of scholarships) {
//             try {
//                 const {
//                     title,
//                     description,
//                     amount,
//                     deadline,
//                     eligibility,
//                     provider,
//                     category,
//                     education_level,
//                     gender,
//                     min_percentage,
//                     max_income,
//                     apply_link
//                 } = scholarship;

//                 // Basic validation
//                 if (!title || !description || !amount || !deadline || !provider) {
//                     failCount++;
//                     errors.push({ title: title || 'Unknown', error: 'Missing required fields' });
//                     continue;
//                 }

//                 await db.query(
//                     `INSERT INTO scholarships 
//           (title, description, amount, deadline, eligibility, provider, category, 
//            education_level, gender, min_percentage, max_income, apply_link) 
//           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
//                         title,
//                         description,
//                         amount,
//                         deadline,
//                         eligibility || null,
//                         provider,
//                         category || null,
//                         education_level || null,
//                         gender || null,
//                         min_percentage || null,
//                         max_income || null,
//                         apply_link || null
//                     ]
//                 );

//                 successCount++;
//             } catch (err) {
//                 failCount++;
//                 errors.push({ title: scholarship.title || 'Unknown', error: err.message });
//             }
//         }

//         res.json({
//             success: true,
//             message: `Bulk upload completed. Success: ${successCount}, Failed: ${failCount}`,
//             data: {
//                 successCount,
//                 failCount,
//                 errors
//             }
//         });
//     } catch (error) {
//         console.error('Bulk upload error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error during bulk upload'
//         });
//     }
// };

// // @desc    Ban/Suspend user
// // @route   PUT /api/admin/users/:id/ban
// // @access  Private (Admin only)
// exports.banUser = async(req, res) => {
//     try {
//         const { id } = req.params;
//         const { action, reason } = req.body; // action: 'ban' or 'unban'

//         if (!['ban', 'unban'].includes(action)) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Invalid action'
//             });
//         }

//         // Check if user exists
//         const [users] = await db.query('SELECT id, name, email, role FROM users WHERE id = ?', [id]);
//         if (users.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'User not found'
//             });
//         }

//         const isBanned = action === 'ban' ? 1 : 0;

//         // Update user status
//         await db.query('UPDATE users SET is_banned = ? WHERE id = ?', [isBanned, id]);

//         // Log activity
//         await db.query(
//             `INSERT INTO activity_logs (user_id, action, details, admin_id) 
//        VALUES (?, ?, ?, ?)`, [
//                 id,
//                 action === 'ban' ? 'USER_BANNED' : 'USER_UNBANNED',
//                 JSON.stringify({ reason: reason || 'No reason provided' }),
//                 req.user.userId
//             ]
//         );

//         res.json({
//             success: true,
//             message: `User ${action === 'ban' ? 'banned' : 'unbanned'} successfully`
//         });
//     } catch (error) {
//         console.error('Ban user error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error updating user status'
//         });
//     }
// };

// // @desc    Get all users with ban status
// // @route   GET /api/admin/users
// // @access  Private (Admin only)
// exports.getAllUsers = async(req, res) => {
//     try {
//         const [users] = await db.query(`
//       SELECT 
//         u.id,
//         u.name,
//         u.email,
//         u.role,
//         u.is_banned,
//         u.created_at,
//         (SELECT COUNT(*) FROM activity_logs WHERE user_id = u.id) as activity_count
//       FROM users u
//       WHERE u.role != 'admin'
//       ORDER BY u.created_at DESC
//     `);

//         res.json({
//             success: true,
//             data: users
//         });
//     } catch (error) {
//         console.error('Get users error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error fetching users'
//         });
//     }
// };

// // @desc    Get user activity logs
// // @route   GET /api/admin/users/:id/activity
// // @access  Private (Admin only)
// exports.getUserActivity = async(req, res) => {
//     try {
//         const { id } = req.params;

//         const [logs] = await db.query(`
//       SELECT 
//         al.*,
//         u.name as user_name,
//         u.email as user_email,
//         admin.name as admin_name
//       FROM activity_logs al
//       JOIN users u ON al.user_id = u.id
//       LEFT JOIN users admin ON al.admin_id = admin.id
//       WHERE al.user_id = ?
//       ORDER BY al.created_at DESC
//       LIMIT 100
//     `, [id]);

//         res.json({
//             success: true,
//             data: logs
//         });
//     } catch (error) {
//         console.error('Get activity logs error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error fetching activity logs'
//         });
//     }
// };

// // @desc    Get all activity logs (admin overview)
// // @route   GET /api/admin/activity-logs
// // @access  Private (Admin only)
// exports.getAllActivityLogs = async(req, res) => {
//     try {
//         const { limit = 50, action } = req.query;

//         let query = `
//       SELECT 
//         al.*,
//         u.name as user_name,
//         u.email as user_email,
//         u.role as user_role,
//         admin.name as admin_name
//       FROM activity_logs al
//       JOIN users u ON al.user_id = u.id
//       LEFT JOIN users admin ON al.admin_id = admin.id
//     `;

//         const params = [];
//         if (action) {
//             query += ' WHERE al.action = ?';
//             params.push(action);
//         }

//         query += ' ORDER BY al.created_at DESC LIMIT ?';
//         params.push(parseInt(limit));

//         const [logs] = await db.query(query, params);

//         res.json({
//             success: true,
//             data: logs
//         });
//     } catch (error) {
//         console.error('Get all activity logs error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error fetching activity logs'
//         });
//     }
// };


// ///////////////// Scholarship insertion not working below ////////////////////////////////
// ///////////////// Scholarship insertion not working below ////////////////////////////////

// ///////////////// Scholarship insertion not working below ////////////////////////////////

// ///////////////// Scholarship insertion not working below ////////////////////////////////

// ///////////////// Scholarship insertion not working below ////////////////////////////////

// ///////////////// Scholarship insertion not working below ////////////////////////////////

// ///////////////// Scholarship insertion not working below ////////////////////////////////

// const db = require('../config/db');

// // @desc    Get all scholarships (admin view with stats)
// // @route   GET /api/admin/scholarships
// // @access  Private (Admin only)
// exports.getAllScholarshipsAdmin = async(req, res) => {
//     try {
//         const [scholarships] = await db.query(`
//       SELECT 
//         s.*,
//         (SELECT COUNT(*) FROM applications WHERE scholarship_id = s.id) as total_applications,
//         (SELECT COUNT(*) FROM applications WHERE scholarship_id = s.id AND status = 'won') as won_count
//       FROM scholarships s
//       ORDER BY s.created_at DESC
//     `);

//         res.json({
//             success: true,
//             data: scholarships
//         });
//     } catch (error) {
//         console.error('Get scholarships error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error fetching scholarships'
//         });
//     }
// };

// // @desc    Get single scholarship by ID
// // @route   GET /api/admin/scholarships/:id
// // @access  Private (Admin only)
// exports.getScholarshipByIdAdmin = async(req, res) => {
//     try {
//         const { id } = req.params;

//         const [scholarships] = await db.query(`
//       SELECT 
//         s.*,
//         (SELECT COUNT(*) FROM applications WHERE scholarship_id = s.id) as total_applications
//       FROM scholarships s
//       WHERE s.id = ?
//     `, [id]);

//         if (scholarships.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Scholarship not found'
//             });
//         }

//         res.json({
//             success: true,
//             data: scholarships[0]
//         });
//     } catch (error) {
//         console.error('Get scholarship error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error fetching scholarship'
//         });
//     }
// };

// // @desc    Add new scholarship
// // @route   POST /api/admin/scholarships
// // @access  Private (Admin only)
// exports.addScholarship = async(req, res) => {
//     try {
//         const {
//             title,
//             description,
//             amount,
//             deadline,
//             eligibility,
//             provider,
//             category,
//             education_level,
//             gender,
//             min_percentage,
//             max_income,
//             apply_link
//         } = req.body;

//         // Validation
//         if (!title || !description || !amount || !deadline || !provider) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Please provide all required fields'
//             });
//         }

//         const [result] = await db.query(
//             `INSERT INTO scholarships 
//       (title, description, amount, deadline, eligibility_text, provider, category_eligible, 
//        education_level, gender_eligible, min_percentage, max_income, apply_link) 
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
//                 title,
//                 description,
//                 amount,
//                 deadline,
//                 eligibility || null,
//                 provider,
//                 category || null,
//                 education_level || null,
//                 gender || null,
//                 min_percentage || null,
//                 max_income || null,
//                 apply_link || null
//             ]
//         );

//         res.status(201).json({
//             success: true,
//             message: 'Scholarship added successfully',
//             data: { id: result.insertId }
//         });
//     } catch (error) {
//         console.error('Add scholarship error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error adding scholarship'
//         });
//     }
// };

// // @desc    Update scholarship
// // @route   PUT /api/admin/scholarships/:id
// // @access  Private (Admin only)
// exports.updateScholarship = async(req, res) => {
//     try {
//         const { id } = req.params;
//         const {
//             title,
//             description,
//             amount,
//             deadline,
//             eligibility,
//             provider,
//             category,
//             education_level,
//             gender,
//             min_percentage,
//             max_income,
//             apply_link
//         } = req.body;

//         // Check if scholarship exists
//         const [existing] = await db.query('SELECT id FROM scholarships WHERE id = ?', [id]);
//         if (existing.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Scholarship not found'
//             });
//         }

//         await db.query(
//             `UPDATE scholarships 
//       SET title = ?, description = ?, amount = ?, deadline = ?, eligibility_text = ?, 
//           provider = ?, category_eligible = ?, education_level = ?, gender_eligible = ?, 
//           min_percentage = ?, max_income = ?, apply_link = ?
//       WHERE id = ?`, [
//                 title,
//                 description,
//                 amount,
//                 deadline,
//                 eligibility || null,
//                 provider,
//                 category || null,
//                 education_level || null,
//                 gender || null,
//                 min_percentage || null,
//                 max_income || null,
//                 apply_link || null,
//                 id
//             ]
//         );

//         res.json({
//             success: true,
//             message: 'Scholarship updated successfully'
//         });
//     } catch (error) {
//         console.error('Update scholarship error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error updating scholarship'
//         });
//     }
// };

// // @desc    Delete scholarship
// // @route   DELETE /api/admin/scholarships/:id
// // @access  Private (Admin only)
// exports.deleteScholarship = async(req, res) => {
//     try {
//         const { id } = req.params;

//         // Check if scholarship exists
//         const [existing] = await db.query('SELECT id FROM scholarships WHERE id = ?', [id]);
//         if (existing.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Scholarship not found'
//             });
//         }

//         // Delete scholarship (applications will be handled by CASCADE or you can delete manually)
//         await db.query('DELETE FROM scholarships WHERE id = ?', [id]);

//         res.json({
//             success: true,
//             message: 'Scholarship deleted successfully'
//         });
//     } catch (error) {
//         console.error('Delete scholarship error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error deleting scholarship'
//         });
//     }
// };

// // @desc    Bulk upload scholarships via CSV
// // @route   POST /api/admin/scholarships/bulk-upload
// // @access  Private (Admin only)
// exports.bulkUploadScholarships = async(req, res) => {
//     try {
//         const { scholarships } = req.body; // Array of scholarship objects

//         if (!Array.isArray(scholarships) || scholarships.length === 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Please provide scholarships array'
//             });
//         }

//         let successCount = 0;
//         let failCount = 0;
//         const errors = [];

//         for (const scholarship of scholarships) {
//             try {
//                 const {
//                     title,
//                     description,
//                     amount,
//                     deadline,
//                     eligibility,
//                     provider,
//                     category,
//                     education_level,
//                     gender,
//                     min_percentage,
//                     max_income,
//                     apply_link
//                 } = scholarship;

//                 // Basic validation
//                 if (!title || !description || !amount || !deadline || !provider) {
//                     failCount++;
//                     errors.push({ title: title || 'Unknown', error: 'Missing required fields' });
//                     continue;
//                 }

//                 await db.query(
//                     `INSERT INTO scholarships 
//           (title, description, amount, deadline, eligibility_text, provider, category_eligible, 
//            education_level, gender_eligible, min_percentage, max_income, apply_link) 
//           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
//                         title,
//                         description,
//                         amount,
//                         deadline,
//                         eligibility || null,
//                         provider,
//                         category || null,
//                         education_level || null,
//                         gender || null,
//                         min_percentage || null,
//                         max_income || null,
//                         apply_link || null
//                     ]
//                 );

//                 successCount++;
//             } catch (err) {
//                 failCount++;
//                 errors.push({ title: scholarship.title || 'Unknown', error: err.message });
//             }
//         }

//         res.json({
//             success: true,
//             message: `Bulk upload completed. Success: ${successCount}, Failed: ${failCount}`,
//             data: {
//                 successCount,
//                 failCount,
//                 errors
//             }
//         });
//     } catch (error) {
//         console.error('Bulk upload error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error during bulk upload'
//         });
//     }
// };

// // @desc    Ban/Suspend user
// // @route   PUT /api/admin/users/:id/ban
// // @access  Private (Admin only)
// exports.banUser = async(req, res) => {
//     try {
//         const { id } = req.params;
//         const { action, reason } = req.body; // action: 'ban' or 'unban'

//         if (!['ban', 'unban'].includes(action)) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Invalid action'
//             });
//         }

//         // Check if user exists
//         const [users] = await db.query('SELECT id, name, email, role FROM users WHERE id = ?', [id]);
//         if (users.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'User not found'
//             });
//         }

//         const isBanned = action === 'ban' ? 1 : 0;

//         // Update user status
//         await db.query('UPDATE users SET is_banned = ? WHERE id = ?', [isBanned, id]);

//         // Log activity
//         await db.query(
//             `INSERT INTO activity_logs (user_id, action, details, admin_id) 
//        VALUES (?, ?, ?, ?)`, [
//                 id,
//                 action === 'ban' ? 'USER_BANNED' : 'USER_UNBANNED',
//                 JSON.stringify({ reason: reason || 'No reason provided' }),
//                 req.user.userId
//             ]
//         );

//         res.json({
//             success: true,
//             message: `User ${action === 'ban' ? 'banned' : 'unbanned'} successfully`
//         });
//     } catch (error) {
//         console.error('Ban user error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error updating user status'
//         });
//     }
// };

// // @desc    Get all users with ban status
// // @route   GET /api/admin/users
// // @access  Private (Admin only)
// exports.getAllUsers = async(req, res) => {
//     try {
//         const [users] = await db.query(`
//       SELECT 
//         u.id,
//         u.name,
//         u.email,
//         u.role,
//         u.is_banned,
//         u.created_at,
//         (SELECT COUNT(*) FROM activity_logs WHERE user_id = u.id) as activity_count
//       FROM users u
//       WHERE u.role != 'admin'
//       ORDER BY u.created_at DESC
//     `);

//         res.json({
//             success: true,
//             data: users
//         });
//     } catch (error) {
//         console.error('Get users error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error fetching users'
//         });
//     }
// };

// // @desc    Get user activity logs
// // @route   GET /api/admin/users/:id/activity
// // @access  Private (Admin only)
// exports.getUserActivity = async(req, res) => {
//     try {
//         const { id } = req.params;

//         const [logs] = await db.query(`
//       SELECT 
//         al.*,
//         u.name as user_name,
//         u.email as user_email,
//         admin.name as admin_name
//       FROM activity_logs al
//       JOIN users u ON al.user_id = u.id
//       LEFT JOIN users admin ON al.admin_id = admin.id
//       WHERE al.user_id = ?
//       ORDER BY al.created_at DESC
//       LIMIT 100
//     `, [id]);

//         res.json({
//             success: true,
//             data: logs
//         });
//     } catch (error) {
//         console.error('Get activity logs error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error fetching activity logs'
//         });
//     }
// };

// // @desc    Get all activity logs (admin overview)
// // @route   GET /api/admin/activity-logs
// // @access  Private (Admin only)
// exports.getAllActivityLogs = async(req, res) => {
//     try {
//         const { limit = 50, action } = req.query;

//         let query = `
//       SELECT 
//         al.*,
//         u.name as user_name,
//         u.email as user_email,
//         u.role as user_role,
//         admin.name as admin_name
//       FROM activity_logs al
//       JOIN users u ON al.user_id = u.id
//       LEFT JOIN users admin ON al.admin_id = admin.id
//     `;

//         const params = [];
//         if (action) {
//             query += ' WHERE al.action = ?';
//             params.push(action);
//         }

//         query += ' ORDER BY al.created_at DESC LIMIT ?';
//         params.push(parseInt(limit));

//         const [logs] = await db.query(query, params);

//         res.json({
//             success: true,
//             data: logs
//         });
//     } catch (error) {
//         console.error('Get all activity logs error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error fetching activity logs'
//         });
//     }
// };

const db = require('../config/db');

// @desc    Get all scholarships (admin view with stats)
// @route   GET /api/admin/scholarships
// @access  Private (Admin only)
exports.getAllScholarshipsAdmin = async(req, res) => {
    try {
        const [scholarships] = await db.query(`
      SELECT 
        s.*,
        (SELECT COUNT(*) FROM applications WHERE scholarship_id = s.id) as total_applications,
        (SELECT COUNT(*) FROM applications WHERE scholarship_id = s.id AND status = 'won') as won_count
      FROM scholarships s
      ORDER BY s.created_at DESC
    `);

        res.json({
            success: true,
            data: scholarships
        });
    } catch (error) {
        console.error('Get scholarships error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching scholarships'
        });
    }
};

// @desc    Get single scholarship by ID
// @route   GET /api/admin/scholarships/:id
// @access  Private (Admin only)
exports.getScholarshipByIdAdmin = async(req, res) => {
    try {
        const { id } = req.params;

        const [scholarships] = await db.query(`
      SELECT 
        s.*,
        (SELECT COUNT(*) FROM applications WHERE scholarship_id = s.id) as total_applications
      FROM scholarships s
      WHERE s.id = ?
    `, [id]);

        if (scholarships.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Scholarship not found'
            });
        }

        res.json({
            success: true,
            data: scholarships[0]
        });
    } catch (error) {
        console.error('Get scholarship error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching scholarship'
        });
    }
};

// @desc    Add new scholarship
// @route   POST /api/admin/scholarships
// @access  Private (Admin only)
exports.addScholarship = async(req, res) => {
    try {
        const {
            title,
            description,
            amount,
            deadline,
            eligibility,
            provider,
            category,
            education_level,
            gender,
            min_percentage,
            max_income,
            apply_link
        } = req.body;

        // Validation
        if (!title || !description || !amount || !deadline || !provider) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        const [result] = await db.query(
            `INSERT INTO scholarships 
      (title, description, amount, deadline, eligibility_text, provider, category_eligible, 
       education_level_eligible, gender_eligible, min_percentage, max_income, apply_link) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
                title,
                description,
                amount,
                deadline,
                eligibility || null,
                provider,
                category || null,
                education_level || null,
                gender || null,
                min_percentage || null,
                max_income || null,
                apply_link || null
            ]
        );

        res.status(201).json({
            success: true,
            message: 'Scholarship added successfully',
            data: { id: result.insertId }
        });
    } catch (error) {
        console.error('Add scholarship error:', error);
        res.status(500).json({
            success: false,
            message: 'Error adding scholarship'
        });
    }
};

// @desc    Update scholarship
// @route   PUT /api/admin/scholarships/:id
// @access  Private (Admin only)
exports.updateScholarship = async(req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            description,
            amount,
            deadline,
            eligibility,
            provider,
            category,
            education_level,
            gender,
            min_percentage,
            max_income,
            apply_link
        } = req.body;

        // Check if scholarship exists
        const [existing] = await db.query('SELECT id FROM scholarships WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Scholarship not found'
            });
        }

        await db.query(
            `UPDATE scholarships 
      SET title = ?, description = ?, amount = ?, deadline = ?, eligibility_text = ?, 
          provider = ?, category_eligible = ?, education_level_eligible = ?, gender_eligible = ?, 
          min_percentage = ?, max_income = ?, apply_link = ?
      WHERE id = ?`, [
                title,
                description,
                amount,
                deadline,
                eligibility || null,
                provider,
                category || null,
                education_level || null,
                gender || null,
                min_percentage || null,
                max_income || null,
                apply_link || null,
                id
            ]
        );

        res.json({
            success: true,
            message: 'Scholarship updated successfully'
        });
    } catch (error) {
        console.error('Update scholarship error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating scholarship'
        });
    }
};

// @desc    Delete scholarship
// @route   DELETE /api/admin/scholarships/:id
// @access  Private (Admin only)
exports.deleteScholarship = async(req, res) => {
    try {
        const { id } = req.params;

        // Check if scholarship exists
        const [existing] = await db.query('SELECT id FROM scholarships WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Scholarship not found'
            });
        }

        // Delete scholarship (applications will be handled by CASCADE or you can delete manually)
        await db.query('DELETE FROM scholarships WHERE id = ?', [id]);

        res.json({
            success: true,
            message: 'Scholarship deleted successfully'
        });
    } catch (error) {
        console.error('Delete scholarship error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting scholarship'
        });
    }
};

// @desc    Bulk upload scholarships via CSV
// @route   POST /api/admin/scholarships/bulk-upload
// @access  Private (Admin only)
exports.bulkUploadScholarships = async(req, res) => {
    try {
        const { scholarships } = req.body; // Array of scholarship objects

        if (!Array.isArray(scholarships) || scholarships.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Please provide scholarships array'
            });
        }

        let successCount = 0;
        let failCount = 0;
        const errors = [];

        for (const scholarship of scholarships) {
            try {
                const {
                    title,
                    description,
                    amount,
                    deadline,
                    eligibility,
                    provider,
                    category,
                    education_level,
                    gender,
                    min_percentage,
                    max_income,
                    apply_link
                } = scholarship;

                // Basic validation
                if (!title || !description || !amount || !deadline || !provider) {
                    failCount++;
                    errors.push({ title: title || 'Unknown', error: 'Missing required fields' });
                    continue;
                }

                await db.query(
                    `INSERT INTO scholarships 
          (title, description, amount, deadline, eligibility_text, provider, category_eligible, 
           education_level_eligible, gender_eligible, min_percentage, max_income, apply_link) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
                        title,
                        description,
                        amount,
                        deadline,
                        eligibility || null,
                        provider,
                        category || null,
                        education_level || null,
                        gender || null,
                        min_percentage || null,
                        max_income || null,
                        apply_link || null
                    ]
                );

                successCount++;
            } catch (err) {
                failCount++;
                errors.push({ title: scholarship.title || 'Unknown', error: err.message });
            }
        }

        res.json({
            success: true,
            message: `Bulk upload completed. Success: ${successCount}, Failed: ${failCount}`,
            data: {
                successCount,
                failCount,
                errors
            }
        });
    } catch (error) {
        console.error('Bulk upload error:', error);
        res.status(500).json({
            success: false,
            message: 'Error during bulk upload'
        });
    }
};

// @desc    Ban/Suspend user
// @route   PUT /api/admin/users/:id/ban
// @access  Private (Admin only)
exports.banUser = async(req, res) => {
    try {
        const { id } = req.params;
        const { action, reason } = req.body; // action: 'ban' or 'unban'

        if (!['ban', 'unban'].includes(action)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid action'
            });
        }

        // Check if user exists
        const [users] = await db.query('SELECT id, name, email, role FROM users WHERE id = ?', [id]);
        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const isBanned = action === 'ban' ? 1 : 0;

        // Update user status
        await db.query('UPDATE users SET is_banned = ? WHERE id = ?', [isBanned, id]);

        // Log activity
        await db.query(
            `INSERT INTO activity_logs (user_id, action, details, admin_id) 
       VALUES (?, ?, ?, ?)`, [
                id,
                action === 'ban' ? 'USER_BANNED' : 'USER_UNBANNED',
                JSON.stringify({ reason: reason || 'No reason provided' }),
                req.user.userId
            ]
        );

        res.json({
            success: true,
            message: `User ${action === 'ban' ? 'banned' : 'unbanned'} successfully`
        });
    } catch (error) {
        console.error('Ban user error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating user status'
        });
    }
};

// @desc    Get all users with ban status
// @route   GET /api/admin/users
// @access  Private (Admin only)
exports.getAllUsers = async(req, res) => {
    try {
        const [users] = await db.query(`
      SELECT 
        u.id,
        u.name,
        u.email,
        u.role,
        u.is_banned,
        u.created_at,
        (SELECT COUNT(*) FROM activity_logs WHERE user_id = u.id) as activity_count
      FROM users u
      WHERE u.role != 'admin'
      ORDER BY u.created_at DESC
    `);

        res.json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching users'
        });
    }
};

// @desc    Get user activity logs
// @route   GET /api/admin/users/:id/activity
// @access  Private (Admin only)
exports.getUserActivity = async(req, res) => {
    try {
        const { id } = req.params;

        const [logs] = await db.query(`
      SELECT 
        al.*,
        u.name as user_name,
        u.email as user_email,
        admin.name as admin_name
      FROM activity_logs al
      JOIN users u ON al.user_id = u.id
      LEFT JOIN users admin ON al.admin_id = admin.id
      WHERE al.user_id = ?
      ORDER BY al.created_at DESC
      LIMIT 100
    `, [id]);

        res.json({
            success: true,
            data: logs
        });
    } catch (error) {
        console.error('Get activity logs error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching activity logs'
        });
    }
};

// @desc    Get all activity logs (admin overview)
// @route   GET /api/admin/activity-logs
// @access  Private (Admin only)
exports.getAllActivityLogs = async(req, res) => {
    try {
        const { limit = 50, action } = req.query;

        let query = `
      SELECT 
        al.*,
        u.name as user_name,
        u.email as user_email,
        u.role as user_role,
        admin.name as admin_name
      FROM activity_logs al
      JOIN users u ON al.user_id = u.id
      LEFT JOIN users admin ON al.admin_id = admin.id
    `;

        const params = [];
        if (action) {
            query += ' WHERE al.action = ?';
            params.push(action);
        }

        query += ' ORDER BY al.created_at DESC LIMIT ?';
        params.push(parseInt(limit));

        const [logs] = await db.query(query, params);

        res.json({
            success: true,
            data: logs
        });
    } catch (error) {
        console.error('Get all activity logs error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching activity logs'
        });
    }
};