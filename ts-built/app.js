"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const api_router_1 = __importDefault(require("./routes/api-router"));
/* needed later

app.use(cors())
*/
app.use(express.json());
app.use("/api", api_router_1.default);
const errorHandler = (err, req, res, next) => { };
app.use(((err, req, res, next) => {
    if (err.code === "22P02") {
        res.status(400).send({ msg: "Bad Request" });
    }
    next(err);
}));
app.use(((err, req, res, next) => {
    if (err.status == 404) {
        res.status(404).send({ msg: "Not Found" });
    }
    next(err);
}));
app.use((err, req, res, next) => {
    console.log(err, "<< error handler err");
    res.status(500).send({ msg: "Internal Server Error" });
});
module.exports = app;
