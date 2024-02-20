import {describe, xdescribe, expect, test, afterAll, beforeEach} from '@jest/globals';
const app = require("../app.ts");
const request = require("supertest");

const { db } = require("../db/connection");
const { seed } = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");

beforeEach(() => seed(data));

afterAll(() => db.end());

describe("/api/test/:kata_id", () => {
  test("POST: 201 should return a results object with the test results on the key of test_results when the posted a user solution that passes no tests", () => {});
  test("POST: 201 should return a results object with the test results on the key of test_results when the posted a user solution that passes some/all tests", () => {});
  test("POST: 201 should return a results object with the console.logs on the key of logs", () => {});
  test("POST: 201 should return a results object with a boolean Success key as true if all tests have passed, false if not", () => {});
  test("POST: 201 should return a results object, and if the Success key is true, post the users solution to the solutions table", () => {});
  test("POST: 400 responds with appropriate status code and error message if missing kata_id in request body", () => {});
  test("POST: 400 responds with appropriate status code and error message if missing user_id in request body", () => {});
  test("POST: 400 responds with appropriate status code and error message if missing solution_body in request body", () => {});
  test("POST: 404 responds with appropriate status and error message if provided with a valid but non-existent user_id in request body", () => {});
  test("POST: 404 responds with appropriate status and error message if provided with a valid but non-existent kata_id in request body", () => {});
  test("POST: 408 responds with appropriate status code and error message if request times out (infinite loop)", () => {});
});
