const db = require('../config/db');

// @desc    Get all scholarships with filters
// @route   GET /api/scholarships
// @access  Public
exports.getAllScholarships = async(req, res) => {
    try {
        const {
            search,
            category,
            min_amount,
            max_amount,
            deadline,
            gender,
            education_level,
            course,
            page = 1,
            limit = 10,
            sort = 'deadline'
        } = req.query;

        // Build WHERE clause dynamically
        let whereConditions = ['verified = TRUE'];
        let queryParams = [];

        // Search by title or provider
        if (search) {
            whereConditions.push('(title LIKE ? OR provider LIKE ? OR description LIKE ?)');
            const searchPattern = `%${search}%`;
            queryParams.push(searchPattern, searchPattern, searchPattern);
        }

        // Filter by gender
        if (gender) {
            whereConditions.push('(gender_eligible = ? OR gender_eligible = "All")');
            queryParams.push(gender);
        }

        // Filter by education level
        if (education_level) {
            whereConditions.push('(education_level_eligible LIKE ? OR education_level_eligible = "All")');
            queryParams.push(`%${education_level}%`);
        }

        // Filter by course
        if (course) {
            whereConditions.push('(course_eligible LIKE ? OR course_eligible = "All")');
            queryParams.push(`%${course}%`);
        }

        // Filter by deadline (upcoming only by default)
        if (deadline === 'upcoming') {
            whereConditions.push('deadline >= CURDATE()');
        } else if (deadline === 'week') {
            whereConditions.push('deadline BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 7 DAY)');
        } else if (deadline === 'month') {
            whereConditions.push('deadline BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 30 DAY)');
        }

        // Build final WHERE clause
        const whereClause = whereConditions.length > 0 ?
            `WHERE ${whereConditions.join(' AND ')}` :
            '';

        // Sorting
        let orderBy = 'deadline ASC';
        if (sort === 'amount-high') orderBy = 'CAST(REPLACE(REPLACE(amount, "₹", ""), ",", "") AS UNSIGNED) DESC';
        if (sort === 'amount-low') orderBy = 'CAST(REPLACE(REPLACE(amount, "₹", ""), ",", "") AS UNSIGNED) ASC';
        if (sort === 'recent') orderBy = 'created_at DESC';

        // Pagination
        const offset = (page - 1) * limit;

        // Get total count
        const [countResult] = await db.query(
            `SELECT COUNT(*) as total FROM scholarships ${whereClause}`,
            queryParams
        );
        const totalScholarships = countResult[0].total;

        // Get scholarships
        const [scholarships] = await db.query(
            `SELECT 
        id, title, provider, amount, deadline, description,
        eligibility_text, apply_link, tags, source,
        gender_eligible, category_eligible, max_income,
        education_level_eligible, course_eligible, min_percentage, min_cgpa
      FROM scholarships 
      ${whereClause}
      ORDER BY ${orderBy}
      LIMIT ? OFFSET ?`, [...queryParams, parseInt(limit), parseInt(offset)]
        );

        // Calculate pagination info
        const totalPages = Math.ceil(totalScholarships / limit);

        res.json({
            success: true,
            data: {
                scholarships,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages,
                    totalScholarships,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1
                }
            }
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
// @route   GET /api/scholarships/:id
// @access  Public
exports.getScholarshipById = async(req, res) => {
    try {
        const { id } = req.params;

        const [scholarships] = await db.query(
            `SELECT 
        s.*,
        (SELECT COUNT(*) FROM applications WHERE scholarship_id = s.id) as total_applicants
      FROM scholarships s
      WHERE s.id = ? AND s.verified = TRUE`, [id]
        );

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
            message: 'Error fetching scholarship details'
        });
    }
};

// @desc    Get scholarship statistics
// @route   GET /api/scholarships/stats
// @access  Public
exports.getScholarshipStats = async(req, res) => {
    try {
        const [stats] = await db.query(`
      SELECT 
        COUNT(*) as total_scholarships,
        COUNT(CASE WHEN deadline >= CURDATE() THEN 1 END) as active_scholarships,
        SUM(CAST(REPLACE(REPLACE(REPLACE(amount, '₹', ''), ',', ''), '/year', '') AS UNSIGNED)) as total_amount
      FROM scholarships
      WHERE verified = TRUE
    `);

        const [categoryStats] = await db.query(`
      SELECT 
        SUBSTRING_INDEX(tags, ',', 1) as category,
        COUNT(*) as count
      FROM scholarships
      WHERE verified = TRUE AND tags IS NOT NULL
      GROUP BY category
      ORDER BY count DESC
      LIMIT 5
    `);

        res.json({
            success: true,
            data: {
                ...stats[0],
                topCategories: categoryStats
            }
        });

    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching statistics'
        });
    }
};