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
exports.checkTopicExists = exports.fetchAllTopics = void 0;
const fs = require("fs/promises");
const format = require("pg-format");
const { db } = require("../../db/connection");
function fetchAllTopics() {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows: topics } = yield db.query(`SELECT * FROM topics`);
        return topics;
    });
}
exports.fetchAllTopics = fetchAllTopics;
function checkTopicExists(topic) {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows } = yield db.query(`SELECT * FROM topics WHERE topic_name =$1`, [
            topic,
        ]);
        if (rows.length === 0)
            return Promise.reject({ status: 404, msg: "Topic not found" });
    });
}
exports.checkTopicExists = checkTopicExists;
