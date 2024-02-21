"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRouter = void 0;
const express_1 = require("express");
exports.testRouter = (0, express_1.Router)();
const { postSolutionToTests, } = require("../mvc/controllers/kata-test.controllers");
//require in controllers
exports.testRouter.route("/:kata_id").post(postSolutionToTests);
module.exports = { testRouter: exports.testRouter };
