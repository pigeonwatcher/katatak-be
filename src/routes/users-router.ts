const usersRouter = require("express").Router();
import {
  getUsers,
  getUserById,
  getSolutionsByUserId,
} from "../mvc/controllers/users.controllers";

usersRouter.route("/").get(getUsers);

usersRouter.route("/:user_id").get(getUserById);

usersRouter.route("/:user_id/solutions").get(getSolutionsByUserId);

module.exports = {
  usersRouter,
};
