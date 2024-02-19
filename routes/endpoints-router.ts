const endpointsRouter = require("express").Router();
//require in controllers

endpointsRouter.route("/").get(/*controller */);

module.exports = endpointsRouter;
