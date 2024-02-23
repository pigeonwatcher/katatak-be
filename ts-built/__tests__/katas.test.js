"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const testData = require("../db/data/test-data/index");
const { seed } = require("../db/seeds/seed");
const { db } = require("../db/connection");
const app = require("../app.ts");
const request = require("supertest");
(0, globals_1.beforeEach)(() => seed(testData));
(0, globals_1.afterAll)(() => db.end());
(0, globals_1.describe)("katas", () => {
    (0, globals_1.describe)("api/katas", () => {
        (0, globals_1.test)("GET: 200 Returns an array of all kata objects", () => __awaiter(void 0, void 0, void 0, function* () {
            const { status, body: { katas }, } = yield request(app).get("/api/katas");
            (0, globals_1.expect)(status).toBe(200);
            (0, globals_1.expect)(Array.isArray(katas)).toBe(true);
            (0, globals_1.expect)(katas.length).not.toBe(0);
            katas.forEach((kata) => {
                (0, globals_1.expect)(typeof kata.kata_name).toBe("string");
                (0, globals_1.expect)(typeof kata.description).toBe("string");
                (0, globals_1.expect)(typeof kata.test_path).toBe("string");
                (0, globals_1.expect)(typeof kata.difficulty).toBe("string");
            });
        }));
        (0, globals_1.test)("GET: 200 returns an array of all the kata objects, including a new key of 'topics' with an array of all that katas associated topics", () => __awaiter(void 0, void 0, void 0, function* () {

            const { body } = yield request(app).get("/api/katas").expect(200);
            body.katas.forEach((kata) => {
                (0, globals_1.expect)(typeof kata.kata_name).toBe("string");
                (0, globals_1.expect)(typeof kata.description).toBe("string");
                (0, globals_1.expect)(typeof kata.test_path).toBe("string");
                (0, globals_1.expect)(typeof kata.difficulty).toBe("string");
                (0, globals_1.expect)(Array.isArray(kata.topics)).toBe(true);
            });
        }));
        (0, globals_1.describe)("?topic", () => {
            (0, globals_1.test)("GET: 200 responds with an array sorted by topic value specified in the query", () => __awaiter(void 0, void 0, void 0, function* () {
                const { body } = yield request(app)
                    .get("/api/katas?topic=maths")
                    .expect(200);
                (0, globals_1.expect)(body.katas.length).toBe(1);
                (0, globals_1.expect)(body.katas[0]).toMatchObject({
                    kata_name: "Square Root",
                    description: "Write a function that takes a number (n) and returns the square root of that number.",
                    test_path: "../db/data/kata-tests/2-squareRoot.test.js",
                    difficulty: "Easy",
                    function_template: "function(num){//your code here}",
                });
            }));
            (0, globals_1.test)("GET: 200 responds with an empty array for a valid topic that has no associated katas", () => __awaiter(void 0, void 0, void 0, function* () {
                const { body } = yield request(app)
                    .get("/api/katas?topic=objects")
                    .expect(200);
                (0, globals_1.expect)(body.katas.length).toBe(0);
            }));
            (0, globals_1.test)("GET: 404 responds with appropriate status code and error message when provided with a non-existent topic", () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield request(app)
                    .get("/api/katas?topic=bananas")
                    .expect(404);
                (0, globals_1.expect)(response.body.msg).toBe("Topic not found");
            }));
        });
        (0, globals_1.describe)("?order_by", () => {
            (0, globals_1.test)("GET: 200 returns an array ordered by easiest first by default", () => __awaiter(void 0, void 0, void 0, function* () {
                const { body } = yield request(app).get("/api/katas").expect(200);
                (0, globals_1.expect)(body.katas[0].kata_name).toBe("Square Root");
            }));
            (0, globals_1.test)("GET: 200 returns an array ordered by hardest first when passed an order_by=hardest query", () => __awaiter(void 0, void 0, void 0, function* () {
                const { body } = yield request(app)
                    .get("/api/katas?order_by=hardest")
                    .expect(200);
                (0, globals_1.expect)(body.katas[0].kata_name).toBe("Fill Square");
            }));
            (0, globals_1.test)("GET: 400 responds with appropriate status code and error message when passed an invalid order_by query", () => __awaiter(void 0, void 0, void 0, function* () {
                const { body } = yield request(app)
                    .get("/api/katas?order_by=bananas")
                    .expect(400);
                (0, globals_1.expect)(body.msg).toBe("Bad Request");
            }));
            //date_created - asc is oldest first and desc is newest first
            //400 if passed invalid order_by ?order_by=bananas
        });
    });
    (0, globals_1.describe)("api/katas/:kata_id", () => {
        (0, globals_1.test)("GET: 200 Returns a kata object with a matching kata id", () => __awaiter(void 0, void 0, void 0, function* () {
            const { status, body: { kata }, } = yield request(app).get("/api/katas/1");
            (0, globals_1.expect)(status).toBe(200);
            (0, globals_1.expect)(kata).toMatchObject({
                kata_id: 1,
                kata_name: "DNA Pairs",
                description: "Create a function that takes a string of DNA and matches each base with its pair, returning a nested array. In DNA, C pairs with G and T pairs with A.",
                test_path: globals_1.expect.any(String),
                difficulty: "Medium",
            });
        }));
        (0, globals_1.test)("GET: 200 returns a kata object with a newly added topics key with an array of all associated topics", () => __awaiter(void 0, void 0, void 0, function* () {
            const { body } = yield request(app).get("/api/katas/1").expect(200);
            (0, globals_1.expect)(body.kata.topics).toEqual([
                "string manipulation",
                "nested arrays",
            ]);
        }));
        (0, globals_1.test)("GET: 400 Returns an error if given an invalid kata id", () => __awaiter(void 0, void 0, void 0, function* () {
            const { status, body: { msg }, } = yield request(app).get("/api/katas/abc");
            (0, globals_1.expect)(msg).toBe("Bad Request");
            (0, globals_1.expect)(status).toBe(400);
        }));
        (0, globals_1.test)("GET: 404 Returns an error if given a non-existent kata id", () => __awaiter(void 0, void 0, void 0, function* () {
            const { status, body: { msg }, } = yield request(app).get("/api/katas/9999");
            (0, globals_1.expect)(msg).toBe("Not Found");
            (0, globals_1.expect)(status).toBe(404);
        }));
    });
});
