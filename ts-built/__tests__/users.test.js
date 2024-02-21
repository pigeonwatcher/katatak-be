"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const app = require("../app.ts");
const request = require("supertest");
const testData = require("../db/data/test-data/index.js");
const { seed } = require("../db/seeds/seed");
const { db } = require("../db/connection");
(0, globals_1.beforeEach)(() => seed(testData));
(0, globals_1.afterAll)(() => db.end());
globals_1.describe.skip("GET /api/users", () => {
    (0, globals_1.test)("200: returns an array of user objects", () => { });
});
globals_1.describe.skip("GET /api/users/:user_id", () => {
    (0, globals_1.test)("200: returns a user object by user_id, { username: '', bio: '', avatar_img_url: ''}", () => { });
    (0, globals_1.test)("400: Bad request for invalid filepath", () => { });
    (0, globals_1.test)("404: Not Found for none-existent user", () => { });
});
