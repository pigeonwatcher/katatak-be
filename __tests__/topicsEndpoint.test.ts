import {test, afterAll, beforeEach, xdescribe } from "@jest/globals";
const app = require("../app.ts");
const request = require("supertest");

const testData = require('../db/data/test-data/index')
const { seed } = require("../db/seeds/seed");
const { db } = require("../db/connection");
beforeEach(() => seed(testData));
afterAll(() => db.end());

xdescribe("GET /api/topics", () => {
  test("GET: 200 responds with an array of topics", () => {
    // return request(app)
    //   .get("/api/topics")
    //   .expect(200)
    //   .then((response) => {
    //     expect(response.topics.length).toBe();
    //     response.topics.forEach((topic) => {});
    //   });
  });
});
