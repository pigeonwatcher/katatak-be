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
exports.fetchKataByID = exports.fetchAllKatas = void 0;
const fs = require("fs/promises");
const format = require("pg-format");
const { db } = require("../../db/connection");
function fetchAllKatas(topic, order_by) {
    return __awaiter(this, void 0, void 0, function* () {
        const validOrderBys = ["hardest", "easiest"];
        if (order_by && !validOrderBys.includes(order_by))
            return Promise.reject({ status: 400, msg: "invalid order_by" });
        let queryStr = `SELECT katas.*, json_agg(topics.topic_name) AS topics FROM katas JOIN kata_topics ON katas.kata_id = kata_topics.kata_id JOIN topics ON kata_topics.topic_id = topics.topic_id`;
        const queries = [];
        if (topic) {
            queries.push(topic);
            queryStr += ` WHERE topic_name = $1`;
        }
        let order = "ASC";
        if (order_by === "hardest") {
            order = "DESC";
        }
        const orderStr = ` ORDER BY CASE difficulty WHEN 'Easy' THEN 1 WHEN 'Medium' THEN 2 WHEN 'Hard' THEN 3 END ${order} `;
        queryStr += ` GROUP BY katas.kata_id ${orderStr}`;
        const { rows } = yield db.query(queryStr, queries);
        return rows;
    });
}
exports.fetchAllKatas = fetchAllKatas;
function fetchKataByID(kata_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows: kata } = yield db.query(`SELECT katas.*, json_agg(topics.topic_name) AS topics FROM katas JOIN kata_topics ON katas.kata_id = kata_topics.kata_id JOIN topics ON kata_topics.topic_id = topics.topic_id WHERE katas.kata_id=$1 GROUP BY katas.kata_id`, [kata_id]);
        if (kata.length === 0) {
            return Promise.reject({
                status: 404,
                msg: `A kata with the id ${kata_id} was not found.`,
            });
        }
        return kata[0];
    });
}
exports.fetchKataByID = fetchKataByID;
