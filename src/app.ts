const express = require("express");
const app = express();
import apiRouter from "./routes/api-router";
const cors = require("cors");
import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

app.use(cors());

app.use(express.json());

interface ErrorMessage {
  msg: string;
}

app.use("/api", apiRouter);

app.all("*", (req: Request, res: Response) => {
  const errorMsg: ErrorMessage = {
    msg: "Endpoint not found!",
  };
  res.status(404).send(errorMsg);
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {};
app.use(((err, req, res, next) => {
  if (err.code === "22P02") {
    const errorMsg: ErrorMessage = {
      msg: "Bad Request",
    };
    res.status(400).send(errorMsg);
  }
  next(err);
}) as ErrorRequestHandler);

app.use(((err, req, res, next) => {
  const errorMsg: ErrorMessage = {
    msg: "",
  };
  if (err.status == 404) {
    if (
      err.msg === "User does not exist!" ||
      err.msg === "Topic not found" ||
      err.msg === "No solutions found for that user"
    ) {
      errorMsg.msg = err.msg;
      res.status(404).send(errorMsg);
    } else {
      errorMsg.msg = "Not Found";
      res.status(404).send(errorMsg);
    }
  }
  next(err);
}) as ErrorRequestHandler);

app.use(((err, req, res, next) => {
  const errorMsg: ErrorMessage = {
    msg: "Bad Request",
  };
  if (err.status === 400) {
    res.status(400).send(errorMsg);
  }
}) as ErrorRequestHandler);

app.use(((err, req, res) => {
  console.log(err);
  const errorMsg: ErrorMessage = {
    msg: "Internal Server Error",
  };
  res.status(500).send(errorMsg);
}) as ErrorRequestHandler);

module.exports = app;
