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
exports.getUserById = exports.getUsers = void 0;
const users_models_1 = require("../models/users.models");
function getUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const results = yield (0, users_models_1.fetchUsers)();
            const users = results.rows;
            res.status(200);
            res.send({ users });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.getUsers = getUsers;
function getUserById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { user_id } = req.params;
            const results = yield (0, users_models_1.fetchUserById)(user_id);
            const user = results.rows[0];
            res.status(200).send({ user });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.getUserById = getUserById;
