const db = require('../config/db');

// @desc    Get student profile
// @route   GET /api/profile
// @access  Private (Student only)
exports.getProfile = async(req, res) => {
    try {
        const userId = req.user.userId;

        const [profiles] = await db.query(
            `SELECT 
        sp.*,
        u.name, u.email
      FROM student_profiles sp
      JOIN users u ON sp.user_id = u.id
      WHERE sp.user_id = ?`, [userId]
        );

        if (profiles.length === 0) {
            return res.json({
                success: true,
                data: null,
                message: 'Profile not found. Please complete your profile.'
            });
        }

        res.json({
            success: true,
            data: profiles[0]
        });

    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching profile'
        });
    }
};

// @desc    Create or Update student profile
// @route   POST /api/profile
// @access  Private (Student only)
exports.createOrUpdateProfile = async(req, res) => {
    try {
        const userId = req.user.userId;
        const {
            dob,
            gender,
            category,
            annual_family_income,
            education_level,
            course,
            field_of_study,
            current_year,
            percentage,
            cgpa,
            college_university,
            state,
            city,
            phone
        } = req.body;

        // Validation - Required fields
        const requiredFields = [
            'dob', 'gender', 'category', 'annual_family_income',
            'education_level', 'course', 'college_university',
            'state', 'city', 'phone'
        ];

        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        // Check if profile already exists
        const [existingProfile] = await db.query(
            'SELECT id FROM student_profiles WHERE user_id = ?', [userId]
        );

        let query;
        let params;

        if (existingProfile.length > 0) {
            // UPDATE existing profile
            query = `
        UPDATE student_profiles 
        SET 
          dob = ?,
          gender = ?,
          category = ?,
          annual_family_income = ?,
          education_level = ?,
          course = ?,
          field_of_study = ?,
          current_year = ?,
          percentage = ?,
          cgpa = ?,
          college_university = ?,
          state = ?,
          city = ?,
          phone = ?,
          profile_completed = TRUE,
          updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ?
      `;
            params = [
                dob, gender, category, annual_family_income,
                education_level, course, field_of_study, current_year,
                percentage, cgpa, college_university, state, city, phone,
                userId
            ];
        } else {
            // INSERT new profile
            query = `
        INSERT INTO student_profiles (
          user_id, dob, gender, category, annual_family_income,
          education_level, course, field_of_study, current_year,
          percentage, cgpa, college_university, state, city, phone,
          profile_completed
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, TRUE)
      `;
            params = [
                userId, dob, gender, category, annual_family_income,
                education_level, course, field_of_study, current_year,
                percentage, cgpa, college_university, state, city, phone
            ];
        }

        await db.query(query, params);

        // Fetch updated profile
        const [updatedProfile] = await db.query(
            'SELECT * FROM student_profiles WHERE user_id = ?', [userId]
        );

        res.json({
            success: true,
            message: existingProfile.length > 0 ? 'Profile updated successfully' : 'Profile created successfully',
            data: updatedProfile[0]
        });

    } catch (error) {
        console.error('Create/Update profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Error saving profile'
        });
    }
};

// @desc    Check if profile is completed
// @route   GET /api/profile/status
// @access  Private (Student only)
exports.getProfileStatus = async(req, res) => {
    try {
        const userId = req.user.userId;

        const [profiles] = await db.query(
            'SELECT profile_completed FROM student_profiles WHERE user_id = ?', [userId]
        );

        if (profiles.length === 0) {
            return res.json({
                success: true,
                data: {
                    profile_completed: false,
                    profile_exists: false
                }
            });
        }

        res.json({
            success: true,
            data: {
                profile_completed: profiles[0].profile_completed,
                profile_exists: true
            }
        });

    } catch (error) {
        console.error('Get profile status error:', error);
        res.status(500).json({
            success: false,
            message: 'Error checking profile status'
        });
    }
};

// @desc    Delete student profile
// @route   DELETE /api/profile
// @access  Private (Student only)
exports.deleteProfile = async(req, res) => {
    try {
        const userId = req.user.userId;

        await db.query('DELETE FROM student_profiles WHERE user_id = ?', [userId]);

        res.json({
            success: true,
            message: 'Profile deleted successfully'
        });

    } catch (error) {
        console.error('Delete profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting profile'
        });
    }
};