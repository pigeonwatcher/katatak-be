import {
  describe,
  xdescribe,
  expect,
  test,
  afterAll,
  beforeEach,
} from "@jest/globals";
const app = require("../app.ts");
const request = require("supertest");

const { db } = require("../db/connection");
const { seed } = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");

beforeEach(() => seed(data));

afterAll(() => db.end());

describe("/api/test/:kata_id", () => {
  test("POST: 201 should return a results object with the test results on the key of test_results when the posted a user solution that passes no tests", async () => {
    const response = await request(app)
      .post("/api/test/1")
      .send({
        kata_id: 1,
        user_id: 1,
        solution_body: "function(){return 'hello'}",
      })
      .expect(201);
    expect(Object.keys(response.body.results).includes("test_results")).toBe(
      true
    );
  });
  test("POST: 201 should return a results object with the test results on the key of test_results when the posted a user solution that passes some tests", async () => {
    const response = await request(app)
      .post("/api/test/1")
      .send({
        kata_id: 1,
        user_id: 1,
        solution_body: "function(){return []}",
      })
      .expect(201);
    expect(Object.keys(response.body.results).includes("test_results")).toBe(
      true
    );
  });
  test("POST: 201 should return a results object with the console.logs on the key of logs", async () => {
    const response = await request(app)
      .post("/api/test/1")
      .send({
        kata_id: 1,
        user_id: 1,
        solution_body: "function(){console.log('hiya');return[]}",
      })
      .expect(201);
    expect(response.body.results.logs.includes("hiya")).toBe(true);
  });
  test("POST: 201 should return a results object with a boolean Success key as false if not all tests have passed", async () => {
    const response = await request(app)
      .post("/api/test/1")
      .send({
        kata_id: 1,
        user_id: 1,
        solution_body: "function(){return[]}",
      })
      .expect(201);
    expect(response.body.results.success).toBe(false);
  });
  test("POST: 201 should return a results object with a boolean Success key as true if all tests have passed", async () => {
    const response = await request(app)
      .post("/api/test/1")
      .send({
        kata_id: 1,
        user_id: 1,
        solution_body: `function dnaPairs(dna){
          const chars = dna.split('');
          const arr = [];
          const lookup = {
            'G': ['G','C'],
            'C': ['C','G'],
            'A': ['A','T'],
            'T': ['T','A']
          };
          for (char of chars){
            arr.push(lookup[char])
          };
          return arr;
        }`,
      })
      .expect(201);
    expect(response.body.results.success).toBe(true);
  });
  test("POST: 201 should return a results object, and if the Success key is true, post the users solution to the solutions table and update posted_solution key to true", async () => {
    const response = await request(app)
      .post("/api/test/1")
      .send({
        kata_id: 1,
        user_id: 2,
        solution_body: `function dnaPairs(dna){
        const chars = dna.split('');
        const arr = [];
        const lookup = {
          'G': ['G','C'],
          'C': ['C','G'],
          'A': ['A','T'],
          'T': ['T','A']
        };
        for (char of chars){
          arr.push(lookup[char])
        };
        return arr;
      }`,
      })
      .expect(201);
    expect(response.body.results.posted_solution).toBe(true);
  });
  test("POST: 400 responds with appropriate status code and error message if missing user_id in request body", async () => {
    const response = await request(app)
      .post("/api/test/1")
      .send({
        solution_body: "function(){return[]}",
      })
      .expect(400);
    expect(response.body.msg).toBe(
      "400 Bad Request: Can't check the solution without user_id!"
    );
  });
  test("POST: 400 responds with appropriate status code and error message if missing solution_body in request body", async () => {
    const response = await request(app)
      .post("/api/test/1")
      .send({
        user_id: 1,
      })
      .expect(400);
    expect(response.body.msg).toBe(
      "400 Bad Request: Can't check the solution without the solution!"
    );
  });
  test("POST: 404 responds with appropriate status and error message if provided with a valid but non-existent kata_id", async () => {
    const response = await request(app)
      .post("/api/test/1000000")
      .send({
        user_id: 1,
        solution_body: "function(){return[]}",
      })
      .expect(404);
    expect(response.body.msg).toBe("A kata with the id 1000000 was not found.");
  });
  test("POST: 404 responds with appropriate status and error message if provided with a valid but non-existent user_id in request body", async () => {
    const response = await request(app)
      .post("/api/test/1")
      .send({
        user_id: 1000,
        solution_body: `function dnaPairs(dna){
        const chars = dna.split('');
        const arr = [];
        const lookup = {
          'G': ['G','C'],
          'C': ['C','G'],
          'A': ['A','T'],
          'T': ['T','A']
        };
        for (char of chars){
          arr.push(lookup[char])
        };
        return arr;
      }`,
      })
      .expect(404);
    expect(response.body.msg).toBe(
      "404 Not Found: Couldn't find a user with that ID."
    );
  });
  // test("POST: 408 responds with appropriate status code and error message if request times out (infinite loop)", () => {});
});
