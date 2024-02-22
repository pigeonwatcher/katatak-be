"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endpointsRouter = void 0;
const express_1 = require("express");
const endpointsJSON = require("../endpoints");
exports.endpointsRouter = (0, express_1.Router)();
exports.endpointsRouter.route("/").get((req, res, err) => {
    let response;
    response = { endpoints: endpointsJSON };
    res.status(200).send(response);
});
