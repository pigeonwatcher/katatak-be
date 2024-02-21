const usersRouter = require("express").Router();
import { getUsers, getUserById } from "../mvc/controllers/users.controllers";

usersRouter.route("/").get(getUsers);

usersRouter.route("/:user_id").get(getUserById);

module.exports = {
  usersRouter,
};
