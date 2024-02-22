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
const fs = require('fs/promises');
const format = require('pg-format');
const { db } = require('../../db/connection');
function fetchAllKatas() {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows: katas } = yield db.query(`SELECT * FROM katas`);
        return katas;
    });
}
exports.fetchAllKatas = fetchAllKatas;
function fetchKataByID(kata_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows: kata } = yield db.query(`SELECT * FROM katas WHERE kata_id=$1`, [kata_id]);
        if (kata.length === 0) {
            return Promise.reject({ status: 404, msg: `A kata with the id ${kata_id} was not found.` });
        }
        return kata[0];
    });
}
exports.fetchKataByID = fetchKataByID;
