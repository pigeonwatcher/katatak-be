const express = require("express");
const app = express();
import apiRouter from "./routes/api-router";
import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

/* needed later

app.use(cors())
app.use(express.json())
*/

app.use("/api", apiRouter);

app.all("*", (req: Request, res: Response) => {
  res.status(404).send({ msg: "Endpoint not found!" });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {};
app.use(((err, req, res, next) => {
  if (err.code === "22P02") {
    if (err.line === "320") {
      res.status(400).send({ msg: "Invalid id, must be an integer!" });
    }
    res.status(400).send({ msg: "Bad Request" });
  }
  next(err);
}) as ErrorRequestHandler);

app.use(((err, req, res, next) => {
  if (err.status == 404) {
    res.status(404).send({ msg: "Not Found" });
  }
  next(err);
}) as ErrorRequestHandler);

app.use(((err, req, res, next) => {
  if (err.status === 400) {
    res.status(400).send({ msg: err.msg });
  }
}) as ErrorRequestHandler);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
