"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const topicsRouter = require("express").Router();
const topics_controllers_1 = require("../mvc/controllers/topics.controllers");
topicsRouter.route("/").get(topics_controllers_1.getAllTopics);
module.exports = { topicsRouter };
