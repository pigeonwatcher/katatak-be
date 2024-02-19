const usersRouter = require("express").Router();
//require in controllers

usersRouter.route("/").get(/*controller*/);

usersRouter.route("/:user_id").get(/*controller*/);

module.exports = {
    usersRouter
}