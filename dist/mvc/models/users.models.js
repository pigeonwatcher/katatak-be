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
exports.fetchUserById = exports.fetchUsers = void 0;
const { db } = require("../../db/connection");
function fetchUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield db.query("SELECT * FROM users");
        return users;
    });
}
exports.fetchUsers = fetchUsers;
function fetchUserById(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield db.query("SELECT * FROM users WHERE user_id = $1", [
            user_id,
        ]);
        if (user.rows.length === 0) {
            return Promise.reject({ status: 404, msg: "User does not exist!" });
        }
        return user;
    });
}
exports.fetchUserById = fetchUserById;
