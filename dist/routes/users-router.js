"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usersRouter = require("express").Router();
const users_controllers_1 = require("../mvc/controllers/users.controllers");
usersRouter.route("/").get(users_controllers_1.getUsers);
usersRouter.route("/:user_id").get(users_controllers_1.getUserById);
module.exports = {
    usersRouter,
};
