"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const katasRouter = require("express").Router();
const katas_controllers_1 = require("../mvc/controllers/katas.controllers");
katasRouter.route("/").get(katas_controllers_1.getAllKatas);
katasRouter.route("/:kata_id").get(katas_controllers_1.getKata);
module.exports = { katasRouter };
