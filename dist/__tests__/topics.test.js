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
const testData = require('../db/data/test-data/index');
const { seed } = require("../db/seeds/seed");
const { db } = require('../db/connection');
const app = require("../app.ts");
const request = require("supertest");
(0, globals_1.beforeEach)(() => seed(testData));
(0, globals_1.afterAll)(() => db.end());
(0, globals_1.describe)("topic", () => {
    (0, globals_1.describe)("api/topics", () => {
        (0, globals_1.test)('GET: 200 Returns an array of all topics', () => __awaiter(void 0, void 0, void 0, function* () {
            const { status, body: { topics } } = yield request(app).get('/api/topics');
            (0, globals_1.expect)(status).toBe(200);
            (0, globals_1.expect)(Array.isArray(topics)).toBe(true);
            (0, globals_1.expect)(topics.length).not.toBe(0);
            topics.forEach((topic) => {
                (0, globals_1.expect)(typeof topic.topic_name).toBe('string');
                (0, globals_1.expect)(typeof topic.description).toBe('string');
            });
        }));
    });
});
