import { describe, expect, test, beforeEach, afterAll } from "@jest/globals";
const app = require("../app.ts");
const request = require("supertest");
const testData = require("../db/data/test-data/index.js");
const { seed } = require("../db/seeds/seed");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe.skip("GET /api/users", () => {
  test("200: returns an array of user objects", () => {});
});

describe.skip("GET /api/users/:user_id", () => {
  test("200: returns a user object by user_id, { username: '', bio: '', avatar_img_url: ''}", () => {});
  test("400: Bad request for invalid filepath", () => {});
  test("404: Not Found for none-existent user", () => {});
});
