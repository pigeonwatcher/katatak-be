import { Router } from "express";

export const endpointsRouter = Router();
//require in controllers

endpointsRouter.route("/").get(/*controller*/);