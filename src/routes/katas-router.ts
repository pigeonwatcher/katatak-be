const katasRouter = require("express").Router();
import { getAllKatas, getKata } from "../mvc/controllers/katas.controllers";

katasRouter.route("/").get(getAllKatas);

katasRouter.route("/:kata_id").get(getKata);

module.exports = { katasRouter }