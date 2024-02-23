import { Router } from "express";

export const testRouter = Router();

const {
  postSolutionToTests,
} = require("../mvc/controllers/kata-test.controllers");
//require in controllers

testRouter.route("/:kata_id").post(postSolutionToTests);

module.exports = { testRouter };
