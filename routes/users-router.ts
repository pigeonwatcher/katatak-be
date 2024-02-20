const usersRouter = require("express").Router();
import { getUsers } from "../mvc/controllers/users.controllers";

usersRouter.route("/").get(getUsers);

usersRouter.route("/:user_id").get(/*controller*/);

module.exports = {
  usersRouter,
};
