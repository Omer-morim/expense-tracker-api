/**
 * @file tests/user.test.js
 * @description Unit tests for user-related endpoints using Jest and Supertest.
 * This file tests retrieving user details by ID and handling of non-existent users.
 */

const request = require('supertest'); // Simulate HTTP requests
const app = require('../index'); // Main Express application

/**
 * @group User API
 * @description Tests for the /api/users/:id endpoint to retrieve user information.
 */
describe('User API Endpoints', () => {

    /**
     * Test case: Successfully retrieves user details by ID.
     *
     * Sends a GET request to `/api/users/1` and expects:
     * - status 200
     * - `first_name` and `total` in the response
     *
     * @returns {void}
     */
    it('should return user details by id', async () => {
        const response = await request(app)
            .get('/api/users/123123'); // המשתמש הקיים במסד

        expect(response.status).toBe(200); // ציפייה לתגובה תקינה
        expect(response.body).toHaveProperty('first_name');
        expect(response.body.first_name).toBe('mosh'); // תואם למסד
        expect(response.body).toHaveProperty('total'); // חובה לוודא גם קיום total
    });
    const mongoose = require('mongoose');

    afterAll(async () => {
        await mongoose.connection.close();
    });

    /**
     * Test case: Fails to find a user that does not exist.
     *
     * Sends a GET request to `/api/users/99999` (non-existent ID).
     * Expects:
     * - status 404
     * - error message: "User not found"
     *
     * @returns {void}
     */
    it('should return 404 if user not found', async () => {
        const response = await request(app)
            .get('/api/users/99999');

        expect(response.status).toBe(404); // Should return Not Found
        expect(response.body.error).toBe('User not found'); // Must include appropriate error message
    });

});
