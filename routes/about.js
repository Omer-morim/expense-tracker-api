/**
 * @file routes/about.js
 * @description Provides the team member details (ID, name, birthday, marital status).
 */
const express = require('express');
const router = express.Router();

// Route: Get team member full details
router.get('/about', (req, res) => {
    res.json([
        {
            id: 211441456,
            first_name: 'Roni',
            last_name: 'Ben shoshan',
            birthday: '28-07-2000',
            marital_status: 'single'
        },
        {
            id: 302867908,
            first_name: 'Omer',
            last_name: 'Morim',
            birthday: '13-05-1990',
            marital_status: 'single'
        }
    ]);
});

module.exports = router;
