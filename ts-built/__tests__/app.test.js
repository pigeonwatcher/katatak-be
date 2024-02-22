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
const endpointsJSON = require("../endpoints");
const { db } = require("../db/connection");
const { seed } = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
(0, globals_1.beforeEach)(() => seed(data));
(0, globals_1.afterAll)(() => db.end());
(0, globals_1.describe)("/api/invalid-end-points", () => {
    (0, globals_1.test)("GET:404 responds with a 404 when passed an invalid path", () => __awaiter(void 0, void 0, void 0, function* () {
        const { status, body: { msg }, } = yield request(app).get("/api/nonsensefkjashslgh");
        (0, globals_1.expect)(status).toBe(404);
        (0, globals_1.expect)(msg).toBe("Endpoint not found!");
    }));
});
(0, globals_1.describe)("/api", () => {
    (0, globals_1.test)("GET: 200 should respond with an object describing all available endpoints", () => __awaiter(void 0, void 0, void 0, function* () {
        const { status, body } = yield request(app).get("/api").expect(200);
        let response;
        response = { endpoints: endpointsJSON };
        (0, globals_1.expect)(status).toBe(200);
        (0, globals_1.expect)(body).toEqual(response);
    }));
});
