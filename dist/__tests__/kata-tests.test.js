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
const { db } = require("../db/connection");
const { seed } = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
(0, globals_1.beforeEach)(() => seed(data));
(0, globals_1.afterAll)(() => db.end());
(0, globals_1.describe)("/api/test/:kata_id", () => {
    (0, globals_1.test)("POST: 201 should return a results object with the test results on the key of test_results when the posted a user solution that passes no tests", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post("/api/test/1")
            .send({
            kata_id: 1,
            user_id: 1,
            solution_body: "function(){return 'hello'}",
        })
            .expect(201);
        (0, globals_1.expect)(Object.keys(response.body.results).includes("test_results")).toBe(true);
    }));
    (0, globals_1.test)("POST: 201 should return a results object with the test results on the key of test_results when the posted a user solution that passes some tests", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post("/api/test/1")
            .send({
            kata_id: 1,
            user_id: 1,
            solution_body: "function(){return []}",
        })
            .expect(201);
        (0, globals_1.expect)(Object.keys(response.body.results).includes("test_results")).toBe(true);
    }));
    (0, globals_1.test)("POST: 201 should return a results object with the console.logs on the key of logs", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post("/api/test/1")
            .send({
            user_id: 1,
            solution_body: "function(){console.log('hiya');console.log('another');return[]}",
        })
            .expect(201);
        (0, globals_1.expect)(response.body.results.logs[0].includes("hiya")).toBe(true);
    }));
    (0, globals_1.test)("POST: 201 should return a results object with a boolean Success key as false if not all tests have passed", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post("/api/test/1")
            .send({
            kata_id: 1,
            user_id: 1,
            solution_body: "function(){return[]}",
        })
            .expect(201);
        (0, globals_1.expect)(response.body.results.success).toBe(false);
    }));
    (0, globals_1.test)("POST: 201 should return a results object with a boolean Success key as true if all tests have passed", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
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
        (0, globals_1.expect)(response.body.results.success).toBe(true);
    }));
    (0, globals_1.test)("POST: 201 should return a results object, and if the Success key is true, post the users solution to the solutions table and update posted_solution key to true", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
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
        (0, globals_1.expect)(response.body.results.posted_solution).toBe(true);
    }));
    (0, globals_1.test)("POST: 400 responds with appropriate status code and error message if missing user_id in request body", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post("/api/test/1")
            .send({
            solution_body: "function(){return[]}",
        })
            .expect(400);
        (0, globals_1.expect)(response.body.msg).toBe("400 Bad Request: Can't check the solution without user_id!");
    }));
    (0, globals_1.test)("POST: 400 responds with appropriate status code and error message if missing solution_body in request body", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post("/api/test/1")
            .send({
            user_id: 1,
        })
            .expect(400);
        (0, globals_1.expect)(response.body.msg).toBe("400 Bad Request: Can't check the solution without the solution!");
    }));
    (0, globals_1.test)("POST: 404 responds with appropriate status and error message if provided with a valid but non-existent kata_id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post("/api/test/1000000")
            .send({
            user_id: 1,
            solution_body: "function(){return[]}",
        })
            .expect(404);
        (0, globals_1.expect)(response.body.msg).toBe("A kata with the id 1000000 was not found.");
    }));
    (0, globals_1.test)("POST: 404 responds with appropriate status and error message if provided with a valid but non-existent user_id in request body", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
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
        (0, globals_1.expect)(response.body.msg).toBe("404 Not Found: Couldn't find a user with that ID.");
    }));
});
