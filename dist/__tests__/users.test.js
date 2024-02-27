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
const app = require("../app.ts");
const request = require("supertest");
const testData = require("../db/data/test-data/index.js");
const { seed } = require("../db/seeds/seed");
const { db } = require("../db/connection");
(0, globals_1.beforeEach)(() => seed(testData));
(0, globals_1.afterAll)(() => db.end());
(0, globals_1.describe)("GET /api/users", () => {
    (0, globals_1.test)("200: returns an array of user objects", () => __awaiter(void 0, void 0, void 0, function* () {
        const { status, body: { users }, } = yield request(app).get("/api/users");
        (0, globals_1.expect)(status).toBe(200);
        (0, globals_1.expect)(users.length).toBe(2);
        users.forEach((user) => {
            (0, globals_1.expect)(typeof user.user_id).toBe("number");
            (0, globals_1.expect)(typeof user.username).toBe("string");
            (0, globals_1.expect)(typeof user.bio).toBe("string");
            (0, globals_1.expect)(typeof user.avatar_img_url).toBe("string");
        });
    }));
});
(0, globals_1.describe)("GET /api/users/:user_id", () => {
    (0, globals_1.test)("200: returns a user object by user_id, { username: '', bio: '', avatar_img_url: ''}", () => __awaiter(void 0, void 0, void 0, function* () {
        const { status, body: { user }, } = yield request(app).get("/api/users/1");
        (0, globals_1.expect)(status).toBe(200);
        (0, globals_1.expect)(user.user_id).toBe(1);
        (0, globals_1.expect)(user).toMatchObject({
            user_id: 1,
            username: "freezypop",
            bio: "I like to sit in the fridge making sick burns about the maternal figure in your life.",
            avatar_img_url: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f",
        });
    }));
    (0, globals_1.test)("400: Bad request for invalid filepath", () => __awaiter(void 0, void 0, void 0, function* () {
        const { status, body: { msg }, } = yield request(app).get("/api/users/:banana");
        (0, globals_1.expect)(status).toBe(400);
        (0, globals_1.expect)(msg).toBe("Bad Request");
    }));
    (0, globals_1.test)("404: Not Found for none-existent user", () => __awaiter(void 0, void 0, void 0, function* () {
        const { status, body: { msg }, } = yield request(app).get("/api/users/5000");
        (0, globals_1.expect)(status).toBe(404);
        (0, globals_1.expect)(msg).toBe("User does not exist!");
    }));
    (0, globals_1.describe)("/solutions", () => {
        (0, globals_1.test)("GET 200: returns an array of the user's solutions with kata_id, solution_id, solution", () => __awaiter(void 0, void 0, void 0, function* () {
            const { body } = yield request(app)
                .get("/api/users/1/solutions")
                .expect(200);
            (0, globals_1.expect)(body.solutions[0]).toMatchObject({
                kata_id: globals_1.expect.any(Number),
                kata_name: globals_1.expect.any(String),
                solution_id: globals_1.expect.any(Number),
                solution: globals_1.expect.any(String),
            });
        }));
        (0, globals_1.test)("GET 400: responds with appropriate message and status code when given an invalid user_id", () => __awaiter(void 0, void 0, void 0, function* () {
            const { body } = yield request(app)
                .get("/api/users/:banana/solutions")
                .expect(400);
            (0, globals_1.expect)(body.msg).toBe("Bad Request");
        }));
        (0, globals_1.test)("GET 404: responds with an appropriate message and status code when given a valid user_id that has no solutions", () => __awaiter(void 0, void 0, void 0, function* () {
            const { body } = yield request(app)
                .get("/api/users/4/solutions")
                .expect(404);
            (0, globals_1.expect)(body.msg).toBe("No solutions found for that user");
        }));
    });
});
