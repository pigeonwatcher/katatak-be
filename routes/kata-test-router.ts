import { Router } from "express";

export const testRouter = Router();
//require in controllers

testRouter.route("/test").get(/*controller*/);

module.exports = { testRouter };
