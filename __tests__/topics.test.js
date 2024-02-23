// import {describe, xdescribe, expect, test, afterAll, beforeEach} from '@jest/globals';
const testData = require("../db/data/test-data/index");
const { seed } = require("../db/seeds/seed");
const { db } = require("../db/connection");
const app = require("../app");
const request = require("supertest");

beforeEach(() => seed(testData));
afterAll(() => db.end());

// interface TopicData {
//   topic_name: string,
//   description: string,
// }

describe("topic", () => {
  describe("api/topics", () => {
    test("GET: 200 Returns an array of all topics", async () => {
      const {
        status,
        body: { topics },
      } = await request(app).get("/api/topics");

      expect(status).toBe(200);
      expect(Array.isArray(topics)).toBe(true);
      expect(topics.length).not.toBe(0);
      topics.forEach((topic) => {
        expect(typeof topic.topic_name).toBe("string");
        expect(typeof topic.description).toBe("string");
      });
    });
  });
});
