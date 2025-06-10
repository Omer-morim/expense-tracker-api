/**
 * @file tests/report.test.js
 * @description Unit tests for the /api/report endpoint using Jest and Supertest.
 * Tests include successful report retrieval, empty reports, and validation errors.
 */

const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');

/**
 * @group Report API
 * @description Tests for generating monthly cost reports via /api/report
 */
describe('Report API Endpoints', () => {

    /**
     * Test case: Successfully retrieves a monthly report for a known user.
     * Assumes user '123123' exists and has cost data for May 2025.
     *
     * @returns {void}
     */
    it('should return a monthly report for a user', async () => {
        const response = await request(app)
            .get('/api/report')
            .query({ id: '123123', year: '2025', month: '5' }); // May 2025

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('costs');
        expect(Array.isArray(response.body.costs)).toBe(true);
    });

    /**
     * Test case: Returns empty categories if no data exists for the given month.
     *
     * @returns {void}
     */
    it('should return an empty costs array if no data is found', async () => {
        const response = await request(app)
            .get('/api/report')
            .query({ id: '123123', year: '1999', month: '1' }); // No data expected

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('costs');
        expect(response.body.costs.length).toBe(5); // 5 categories always returned
        response.body.costs.forEach(category => {
            const values = Object.values(category)[0];
            expect(Array.isArray(values)).toBe(true);
        });
    });

    /**
     * Test case: Missing required query parameters should result in 400.
     *
     * @returns {void}
     */
    it('should return 400 if parameters are missing', async () => {
        const response = await request(app)
            .get('/api/report'); // No query parameters

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Bad Request');
    });
});

// Close MongoDB connection after tests
afterAll(async () => {
    await mongoose.connection.close();
});
