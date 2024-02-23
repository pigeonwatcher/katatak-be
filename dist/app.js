"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const api_router_1 = __importDefault(require("./routes/api-router"));
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/api", api_router_1.default);
app.all("*", (req, res) => {
    const errorMsg = {
        msg: "Endpoint not found!",
    };
    res.status(404).send(errorMsg);
});
const errorHandler = (err, req, res, next) => { };
app.use(((err, req, res, next) => {
    if (err.code === "22P02") {
        const errorMsg = {
            msg: "Bad Request",
        };
        res.status(400).send(errorMsg);
    }
    next(err);
}));
app.use(((err, req, res, next) => {
    const errorMsg = {
        msg: "",
    };
    if (err.status == 404) {
        if (err.msg === "User does not exist!" || err.msg === "Topic not found") {
            errorMsg.msg = err.msg;
            res.status(404).send(errorMsg);
        }
        else {
            errorMsg.msg = "Not Found";
            res.status(404).send(errorMsg);
        }
    }
    next(err);
}));
app.use(((err, req, res, next) => {
    const errorMsg = {
        msg: "Bad Request",
    };
    if (err.status === 400) {
        res.status(400).send(errorMsg);
    }
}));
app.use(((err, req, res) => {
    console.log(err);
    const errorMsg = {
        msg: "Internal Server Error",
    };
    res.status(500).send(errorMsg);
}));
module.exports = app;
