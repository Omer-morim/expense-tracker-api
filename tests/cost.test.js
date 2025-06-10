/**
 * @file tests/cost.test.js
 * @description Unit tests for cost-related API endpoints using Jest and Supertest.
 * Tests cover creating a new cost entry and validating error handling for missing fields.
 */

const request = require('supertest'); // Import Supertest for API testing
const app = require('../index'); // Import the main Express application

/**
 * Group of tests related to cost API endpoints.
 * @group Cost API
 */
describe('Cost API Endpoints', () => {

    /**
     * Test case: Create a new cost entry with valid data.
     * Sends a POST request to /api/add with a valid cost object.
     * Expects a 200 OK response and verifies the returned fields.
     *
     * @function
     * @name it - should create a new cost entry
     * @returns {void}
     */
    it('should create a new cost entry', async () => {
        const newCost = {
            description: 'clean',     // Cost description
            category: 'housing',      // Cost category
            userid: '1',              // User ID
            sum: 200                  // Cost amount
        };

        const response = await request(app)
            .post('/api/add')
            .send(newCost)
            .set('Content-Type', 'application/json');

        // Validations
        expect(response.status).toBe(200); // Expect status 200
        expect(response.body).toHaveProperty('_id'); // Expect returned object to have an _id
        expect(response.body.description).toBe(newCost.description); // Expect description to match
        expect(response.body.category).toBe(newCost.category); // Expect category to match
    });

    /**
     * Test case: Fail to create a cost entry when a required field is missing.
     * Sends a POST request without the required `userid` field.
     * Expects a 400 Bad Request response with an appropriate error message.
     *
     * @function
     * @name it - should return 400 if a required field is missing
     * @returns {void}
     */
    it('should return 400 if a required field is missing', async () => {
        const incompleteCost = {
            description: 'Dinner', // Cost description
            category: 'food',      // Cost category
            sum: 100               // Cost amount (userid is missing)
        };

        const response = await request(app)
            .post('/api/add')
            .send(incompleteCost)
            .set('Content-Type', 'application/json');

        // Validations
        expect(response.status).toBe(400); // Expect status 400
        expect(response.body.error).toBe('Bad Request'); // Expect error key with message
    });
    const mongoose = require('mongoose');

    afterAll(async () => {
        await mongoose.connection.close();
    });
});
