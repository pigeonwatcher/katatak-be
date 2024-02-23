// import {
//   describe,
//   xdescribe,
//   expect,
//   test,
//   afterAll,
//   beforeEach,
// } from "@jest/globals";
const testData = require("../db/data/test-data/index");
const { seed } = require("../db/seeds/seed");
const { db } = require("../db/connection");
const app = require("../app");
const request = require("supertest");

beforeEach(() => seed(testData));
afterAll(() => db.end());

// interface KataData {
//   kata_name: string;
//   description: string;
//   test_path: string;
//   difficulty: string;
//   topics: string[];
// }

describe("katas", () => {
  describe("api/katas", () => {
    test("GET: 200 Returns an array of all kata objects", async () => {
      const {
        status,
        body: { katas },
      } = await request(app).get("/api/katas");

      expect(status).toBe(200);
      expect(Array.isArray(katas)).toBe(true);
      expect(katas.length).not.toBe(0);
      katas.forEach((kata) => {
        expect(typeof kata.kata_name).toBe("string");
        expect(typeof kata.description).toBe("string");
        expect(typeof kata.test_path).toBe("string");
        expect(typeof kata.difficulty).toBe("string");
      });
    });
    test("GET: 200 returns an array of all the kata objects, including a new key of 'topics' with an array of all that katas associated topics", async () => {
      const { body } = await request(app).get("/api/katas").expect(200);

      body.katas.forEach((kata) => {
        expect(typeof kata.kata_name).toBe("string");
        expect(typeof kata.description).toBe("string");
        expect(typeof kata.test_path).toBe("string");
        expect(typeof kata.difficulty).toBe("string");
        expect(Array.isArray(kata.topics)).toBe(true);
      });
    });
    describe("?topic", () => {
      test("GET: 200 responds with an array sorted by topic value specified in the query", async () => {
        const { body } = await request(app)
          .get("/api/katas?topic=maths")
          .expect(200);

        expect(body.katas.length).toBe(1);
        expect(body.katas[0]).toMatchObject({
          kata_name: "Square Root",
          description:
            "Write a function that takes a number (n) and returns the square root of that number.",
          test_path: "../db/data/kata-tests/2-squareRoot.test.js",
          difficulty: "Easy",
          function_template: "function(num){//your code here}",
        });
      });
      test("GET: 200 responds with an empty array for a valid topic that has no associated katas", async () => {
        const { body } = await request(app)
          .get("/api/katas?topic=objects")
          .expect(200);

        expect(body.katas.length).toBe(0);
      });
      test("GET: 404 responds with appropriate status code and error message when provided with a non-existent topic", async () => {
        const response = await request(app)
          .get("/api/katas?topic=bananas")
          .expect(404);

        expect(response.body.msg).toBe("Topic not found");
      });
    });
    describe("?order_by", () => {
      test("GET: 200 returns an array ordered by easiest first by default", async () => {
        const { body } = await request(app).get("/api/katas").expect(200);

        expect(body.katas[0].kata_name).toBe("Square Root");
      });
      test("GET: 200 returns an array ordered by hardest first when passed an order_by=hardest query", async () => {
        const { body } = await request(app)
          .get("/api/katas?order_by=hardest")
          .expect(200);

        expect(body.katas[0].kata_name).toBe("Fill Square");
      });
      test("GET: 400 responds with appropriate status code and error message when passed an invalid order_by query", async () => {
        const { body } = await request(app)
          .get("/api/katas?order_by=bananas")
          .expect(400);

        expect(body.msg).toBe("Bad Request");
      });
    });
  });
  describe("api/katas/:kata_id", () => {
    test("GET: 200 Returns a kata object with a matching kata id", async () => {
      const {
        status,
        body: { kata },
      } = await request(app).get("/api/katas/1");

      expect(status).toBe(200);
      expect(kata).toMatchObject({
        kata_id: 1,
        kata_name: "DNA Pairs",
        description:
          "Create a function that takes a string of DNA and matches each base with its pair, returning a nested array. In DNA, C pairs with G and T pairs with A.",
        test_path: expect.any(String),
        difficulty: "Medium",
      });
    });
    test("GET: 200 returns a kata object with a newly added topics key with an array of all associated topics", async () => {
      const { body } = await request(app).get("/api/katas/1").expect(200);

      expect(body.kata.topics).toEqual([
        "string manipulation",
        "nested arrays",
      ]);
    });
    test("GET: 400 Returns an error if given an invalid kata id", async () => {
      const {
        status,
        body: { msg },
      } = await request(app).get("/api/katas/abc");
      expect(msg).toBe("Bad Request");
      expect(status).toBe(400);
    });
    test("GET: 404 Returns an error if given a non-existent kata id", async () => {
      const {
        status,
        body: { msg },
      } = await request(app).get("/api/katas/9999");
      expect(msg).toBe("Not Found");
      expect(status).toBe(404);
    });
  });
});
