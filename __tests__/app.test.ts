import { describe, expect, test, beforeEach, afterAll } from "@jest/globals";
const app = require("../app.ts");
const request = require("supertest");

// const db = require("../db/connection");
// const seed = require("../db/seeds/seed");
// const data = require("../db/data/test-data/index");

// beforeEach(() => seed(data));

// afterAll(() => db.end());

describe.skip("/api/invalid-end-points", () => {
  test("GET:404 responds with a 404 when passed an invalid path", async () => {
    // const testObj = await request(app);
    // const response = await testObj.get("/api/nonsensefkjashslgh");
    // expect(response.body.msg).toBe("Endpoint not found!");
    // expect(response.status).toBe(404);
  });
});

describe.skip("/api", () => {
  //const endpoints = require("../endpoints.json");
  test("GET: 200 should respond with an object describing all available endpoints", () => {});
});
