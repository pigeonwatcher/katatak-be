"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const app = require("../app.ts");
const request = require("supertest");
const testData = require('../db/data/test-data/index');
const { seed } = require("../db/seeds/seed");
const { db } = require("../db/connection");
(0, globals_1.beforeEach)(() => seed(testData));
(0, globals_1.afterAll)(() => db.end());
(0, globals_1.xdescribe)("GET /api/topics", () => {
    (0, globals_1.test)("GET: 200 responds with an array of topics", () => {
        // return request(app)
        //   .get("/api/topics")
        //   .expect(200)
        //   .then((response) => {
        //     expect(response.topics.length).toBe();
        //     response.topics.forEach((topic) => {});
        //   });
    });
});
