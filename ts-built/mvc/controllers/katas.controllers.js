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
exports.getKata = exports.getAllKatas = void 0;
const { fetchAllKatas, fetchKataByID } = require('../models/katas.models');
function getAllKatas(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const katas = yield fetchAllKatas();
            res.status(200).send({ katas });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.getAllKatas = getAllKatas;
function getKata(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { kata_id } = req.params;
            const kata = yield fetchKataByID(kata_id);
            res.status(200).send({ kata });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.getKata = getKata;
