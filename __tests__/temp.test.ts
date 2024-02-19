import {describe, expect, test} from '@jest/globals';
const app = require("../app.ts");
const request = require("supertest");

describe("This is a describe of a test of the test", () => {
    test("This is a test of the test", async () => {
        const testObj = await request(app);
        const response = await testObj.get('/api');
        console.log(response.body);
        expect(Object.keys(response.body).length).toBe(0);
    })
})