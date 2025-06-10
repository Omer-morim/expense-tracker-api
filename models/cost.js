/**
 * @file models/cost.js
 * @description Mongoose schema and model for cost items.
 */

const mongoose = require('mongoose');

/**
 * Mongoose schema for a cost item.
 * @typedef Cost
 * @property {string} userid - ID of the user to whom the cost belongs
 * @property {string} description - Description of the cost item
 * @property {string} category - One of: food, health, housing, sport, education
 * @property {number} sum - Amount of the cost
 * @property {Date} [date] - Date of the cost (defaults to current date if not provided)
 */
const costSchema = new mongoose.Schema({
    userid: { type: String, required: true },
    description: { type: String, required: true },
    category: {
        type: String,
        required: true,
        enum: ['food', 'health', 'housing', 'sport', 'education']
    },
    sum: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cost', costSchema);
