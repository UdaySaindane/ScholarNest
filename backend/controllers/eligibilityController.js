const db = require('../config/db');

// @desc    Get scholarship recommendations based on student profile
// @route   GET /api/eligibility/recommendations
// @access  Private (Student only)
exports.getRecommendations = async(req, res) => {
    try {
        const userId = req.user.userId;

        // Get student profile
        const [profile] = await db.query(
            `SELECT * FROM student_profiles WHERE user_id = ?`, [userId]
        );

        if (profile.length === 0 || !profile[0].profile_completed) {
            return res.status(400).json({
                success: false,
                message: 'Please complete your profile first to get recommendations'
            });
        }

        const student = profile[0];

        // Get all active scholarships
        const [scholarships] = await db.query(
            `SELECT * FROM scholarships WHERE deadline >= CURDATE() ORDER BY created_at DESC`
        );

        // Calculate match score for each scholarship
        const recommendations = scholarships.map(scholarship => {
            const score = calculateMatchScore(student, scholarship);
            return {
                ...scholarship,
                match_score: score.percentage,
                match_details: score.details,
                eligible: score.percentage >= 50 // At least 50% match
            };
        });

        // Sort by match score (highest first)
        recommendations.sort((a, b) => b.match_score - a.match_score);

        // Filter only eligible scholarships (>= 50% match)
        const eligible = recommendations.filter(s => s.eligible);

        res.json({
            success: true,
            data: {
                all: recommendations,
                eligible: eligible,
                total_scholarships: scholarships.length,
                eligible_count: eligible.length
            }
        });

    } catch (error) {
        console.error('Get recommendations error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching recommendations'
        });
    }
};

// @desc    Check eligibility for a specific scholarship
// @route   GET /api/eligibility/check/:scholarshipId
// @access  Private (Student only)
exports.checkEligibility = async(req, res) => {
    try {
        const userId = req.user.userId;
        const { scholarshipId } = req.params;

        // Get student profile
        const [profile] = await db.query(
            `SELECT * FROM student_profiles WHERE user_id = ?`, [userId]
        );

        if (profile.length === 0 || !profile[0].profile_completed) {
            return res.status(400).json({
                success: false,
                message: 'Please complete your profile first'
            });
        }

        // Get scholarship
        const [scholarships] = await db.query(
            `SELECT * FROM scholarships WHERE id = ?`, [scholarshipId]
        );

        if (scholarships.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Scholarship not found'
            });
        }

        const student = profile[0];
        const scholarship = scholarships[0];

        const result = calculateMatchScore(student, scholarship);

        res.json({
            success: true,
            data: {
                eligible: result.percentage >= 50,
                match_score: result.percentage,
                details: result.details,
                scholarship: {
                    id: scholarship.id,
                    title: scholarship.title,
                    amount: scholarship.amount
                }
            }
        });

    } catch (error) {
        console.error('Check eligibility error:', error);
        res.status(500).json({
            success: false,
            message: 'Error checking eligibility'
        });
    }
};

// Helper function to calculate match score
function calculateMatchScore(student, scholarship) {
    let totalCriteria = 0;
    let matchedCriteria = 0;
    const details = [];

    // 1. Gender Check
    if (scholarship.gender_eligible) {
        totalCriteria++;
        const eligibleGenders = scholarship.gender_eligible.toLowerCase().split(',').map(g => g.trim());

        if (eligibleGenders.includes('all') ||
            eligibleGenders.includes(student.gender.toLowerCase())) {
            matchedCriteria++;
            details.push({ criteria: 'Gender', matched: true, message: '✓ Gender eligible' });
        } else {
            details.push({ criteria: 'Gender', matched: false, message: `✗ Only for ${scholarship.gender_eligible}` });
        }
    }

    // 2. Category Check
    if (scholarship.category_eligible) {
        totalCriteria++;
        const eligibleCategories = scholarship.category_eligible.toLowerCase().split(',').map(c => c.trim());

        if (eligibleCategories.includes('all') ||
            eligibleCategories.includes(student.category.toLowerCase())) {
            matchedCriteria++;
            details.push({ criteria: 'Category', matched: true, message: '✓ Category eligible' });
        } else {
            details.push({ criteria: 'Category', matched: false, message: `✗ Only for ${scholarship.category_eligible}` });
        }
    }

    // 3. Income Check
    if (scholarship.max_income) {
        totalCriteria++;
        if (student.annual_family_income <= scholarship.max_income) {
            matchedCriteria++;
            details.push({ criteria: 'Income', matched: true, message: `✓ Income within limit (₹${scholarship.max_income})` });
        } else {
            details.push({ criteria: 'Income', matched: false, message: `✗ Income exceeds limit (₹${scholarship.max_income})` });
        }
    }

    // 4. Education Level Check
    if (scholarship.education_level_eligible) {
        totalCriteria++;
        const eligibleLevels = scholarship.education_level_eligible.toLowerCase().split(',').map(l => l.trim());

        if (eligibleLevels.includes('all') ||
            eligibleLevels.some(level => student.education_level.toLowerCase().includes(level))) {
            matchedCriteria++;
            details.push({ criteria: 'Education Level', matched: true, message: '✓ Education level matches' });
        } else {
            details.push({ criteria: 'Education Level', matched: false, message: `✗ Only for ${scholarship.education_level_eligible}` });
        }
    }

    // 5. Course Check
    if (scholarship.course_eligible) {
        totalCriteria++;
        const eligibleCourses = scholarship.course_eligible.toLowerCase().split(',').map(c => c.trim());

        if (eligibleCourses.includes('all') ||
            eligibleCourses.some(course => student.course.toLowerCase().includes(course))) {
            matchedCriteria++;
            details.push({ criteria: 'Course', matched: true, message: '✓ Course eligible' });
        } else {
            details.push({ criteria: 'Course', matched: false, message: `✗ Only for ${scholarship.course_eligible}` });
        }
    }

    // 6. Field of Study Check
    if (scholarship.field_eligible) {
        totalCriteria++;
        const eligibleFields = scholarship.field_eligible.toLowerCase().split(',').map(f => f.trim());

        if (eligibleFields.includes('all') ||
            eligibleFields.some(field => student.field_of_study.toLowerCase().includes(field))) {
            matchedCriteria++;
            details.push({ criteria: 'Field of Study', matched: true, message: '✓ Field of study matches' });
        } else {
            details.push({ criteria: 'Field of Study', matched: false, message: `✗ Only for ${scholarship.field_eligible}` });
        }
    }

    // 7. Percentage Check
    if (scholarship.min_percentage) {
        totalCriteria++;
        if (student.percentage >= scholarship.min_percentage) {
            matchedCriteria++;
            details.push({ criteria: 'Percentage', matched: true, message: `✓ Percentage meets requirement (${scholarship.min_percentage}%)` });
        } else {
            details.push({ criteria: 'Percentage', matched: false, message: `✗ Minimum ${scholarship.min_percentage}% required` });
        }
    }

    // 8. CGPA Check
    if (scholarship.min_cgpa) {
        totalCriteria++;
        if (student.cgpa >= scholarship.min_cgpa) {
            matchedCriteria++;
            details.push({ criteria: 'CGPA', matched: true, message: `✓ CGPA meets requirement (${scholarship.min_cgpa})` });
        } else {
            details.push({ criteria: 'CGPA', matched: false, message: `✗ Minimum ${scholarship.min_cgpa} CGPA required` });
        }
    }

    // 9. State Check
    if (scholarship.state_eligible) {
        totalCriteria++;
        const eligibleStates = scholarship.state_eligible.toLowerCase().split(',').map(s => s.trim());

        if (eligibleStates.includes('all') ||
            eligibleStates.includes(student.state.toLowerCase())) {
            matchedCriteria++;
            details.push({ criteria: 'State', matched: true, message: '✓ State eligible' });
        } else {
            details.push({ criteria: 'State', matched: false, message: `✗ Only for ${scholarship.state_eligible}` });
        }
    }

    // Calculate percentage
    const percentage = totalCriteria > 0 ? Math.round((matchedCriteria / totalCriteria) * 100) : 0;

    return {
        percentage,
        matched: matchedCriteria,
        total: totalCriteria,
        details
    };
}

module.exports = {
    getRecommendations: exports.getRecommendations,
    checkEligibility: exports.checkEligibility
};