/**
 * @file models/user.js
 * @description Mongoose schema and model for users.
 */

const mongoose = require('mongoose');

/**
 * Mongoose schema for a user.
 * @typedef User
 * @property {string} id - Unique user ID
 * @property {string} first_name - First name of the user
 * @property {string} last_name - Last name of the user
 * @property {Date} birthday - Birth date of the user
 * @property {string} marital_status - Marital status (e.g., single, married)
 */
const userSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    birthday: { type: Date, required: true },
    marital_status: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
