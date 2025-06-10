/**
 * @file routes/costs.js
 * @description API for handling cost-related operations (add cost, generate monthly report).
 */

const express = require('express'); // Import the Express framework
const router = express.Router(); // Create an Express router instance
const Cost = require('../models/cost'); // Import the Cost model

/**
 * @route POST /api/add
 * @group Costs - Add a new cost item
 * @param {string} userid.body.required - ID of the user
 * @param {string} category.body.required - Category of the cost
 * @param {number} sum.body.required - Sum of the cost
 * @param {string} description.body.required - Description of the cost
 * @returns {object} 200 - The created cost item
 * @returns {object} 400 - Missing or invalid fields
 * @returns {object} 500 - Internal server error
 */
router.post('/add', async (req, res) => {
    try {
        const { userid, sum, category, description } = req.body;

        if (!userid) {
            return res.status(400).json({
                error: 'Bad Request',
                message: "Missing 'userid' field."
            });
        }

        if (!sum || !category || !description) {
            return res.status(400).json({
                error: 'Bad Request',
                message: "Missing required fields: 'sum', 'category', or 'description'."
            });
        }

        const cost = new Cost({ userid, sum, category, description });
        const savedCost = await cost.save();

        return res.status(200).json(savedCost);

    } catch (err) {
        console.error('Error saving cost:', err);
        res.status(500).json({
            error: 'Internal Server Error',
            message: `An error occurred while saving the cost: ${err.message}`
        });
    }
});

/**
 * @route GET /api/report
 * @group Costs - Get cost report for a user
 * @param {string} id.query.required - ID of the user
 * @param {number} year.query.required - Year of the report
 * @param {number} month.query.required - Month of the report
 * @returns {object} 200 - JSON report grouped by categories
 * @returns {object} 400 - Missing query parameters
 * @returns {object} 500 - Internal server error
 */
router.get('/report', async (req, res) => {
    try {
        const { id, year, month } = req.query;

        if (!id) {
            return res.status(400).json({
                error: 'Bad Request',
                message: "Missing 'id' query parameter."
            });
        }

        if (!year) {
            return res.status(400).json({
                error: 'Bad Request',
                message: "Missing 'year' query parameter."
            });
        }

        if (!month) {
            return res.status(400).json({
                error: 'Bad Request',
                message: "Missing 'month' query parameter."
            });
        }

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59, 999);

        const costs = await Cost.aggregate([
            {
                $match: {
                    userid: id,
                    date: {
                        $gte: startDate,
                        $lt: endDate,
                    },
                },
            },
            {
                $group: {
                    _id: { category: '$category' },
                    items: { $push: { sum: '$sum', description: '$description', day: { $dayOfMonth: '$date' } } }
                },
            },
            {
                $sort: { '_id.category': 1 },
            }
        ]);

        const categories = ["food", "health", "housing", "sport", "education"];
        let report = categories.map(category => ({ [category]: [] }));

        costs.forEach(cost => {
            const category = report.find(r => Object.keys(r)[0] === cost._id.category);
            if (category) {
                category[cost._id.category] = cost.items.map(item => ({
                    sum: item.sum,
                    description: item.description,
                    day: item.day
                }));
            }
        });

        report.sort((a, b) => {
            const aValues = Object.values(a)[0].length;
            const bValues = Object.values(b)[0].length;
            return aValues === 0 ? 1 : bValues === 0 ? -1 : 0;
        });

        res.status(200).json({
            userid: parseInt(id),
            year: parseInt(year),
            month: parseInt(month),
            costs: report
        });

    } catch (error) {
        console.error('Error fetching report:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: `An error occurred while fetching the report: ${error.message}`
        });
    }
});

module.exports = router;
