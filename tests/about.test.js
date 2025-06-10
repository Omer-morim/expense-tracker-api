/**
 * @file tests/about.test.js
 * @description Unit tests for the /api/about endpoint using Jest and Supertest.
 * Verifies that team member details are returned correctly and completely.
 */

const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');

/**
 * @group About API
 * @description Tests the /api/about endpoint for full team member details.
 */
describe('About API Endpoint', () => {

    /**
     * Test case: Should return a list of team members with full details.
     *
     * @returns {void}
     */
    it('should return team members with full details', async () => {
        const response = await request(app).get('/api/about');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

        response.body.forEach(member => {
            expect(member).toHaveProperty('id');
            expect(member).toHaveProperty('first_name');
            expect(member).toHaveProperty('last_name');
            expect(member).toHaveProperty('birthday');
            expect(member).toHaveProperty('marital_status');

            // טיפוסי מידע
            expect(typeof member.id).toBe('number');
            expect(typeof member.first_name).toBe('string');
            expect(typeof member.last_name).toBe('string');
            expect(typeof member.birthday).toBe('string');
            expect(typeof member.marital_status).toBe('string');
        });
    });
});

// Close DB connection after tests
afterAll(async () => {
    await mongoose.connection.close();
});
