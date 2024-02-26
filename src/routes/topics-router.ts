const topicsRouter = require("express").Router();
import { getAllTopics } from "../mvc/controllers/topics.controllers";

topicsRouter.route("/").get(getAllTopics)

module.exports = { topicsRouter }