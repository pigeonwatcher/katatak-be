const {
  describe,
  expect,
  test,
  beforeEach,
  afterAll,
} = require("@jest/globals");
const app = require("../app");
const request = require("supertest");
const endpointsJSON = require("../endpoints");

const { db } = require("../db/connection");
const { seed } = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");

beforeEach(() => seed(data));

afterAll(() => db.end());

describe("/api/invalid-end-points", () => {
  test("GET:404 responds with a 404 when passed an invalid path", async () => {
    const {
      status,
      body: { msg },
    } = await request(app).get("/api/nonsensefkjashslgh");
    expect(status).toBe(404);
    expect(msg).toBe("Endpoint not found!");
  });
});

describe("/api", () => {
  test("GET: 200 should respond with an object describing all available endpoints", async () => {
    const { status, body } = await request(app).get("/api").expect(200);
    //let response: { endpoints: string };
    const response = { endpoints: endpointsJSON };

    expect(status).toBe(200);
    expect(body).toEqual(response);
  });
});
