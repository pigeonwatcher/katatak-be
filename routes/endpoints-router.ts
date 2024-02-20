import { Router } from "express";
const endpointsJSON: string = require("../endpoints");

export const endpointsRouter = Router();

endpointsRouter.route("/").get((req, res, err) => {
  let response : { endpoints: string; };
  response = { endpoints: endpointsJSON };

  res.status(200).send(response);
});
