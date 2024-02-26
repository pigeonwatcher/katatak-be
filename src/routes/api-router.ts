import { endpointsRouter } from "./endpoints-router";

const apiRouter = require("express").Router();

const { katasRouter } = require("./katas-router");
const { usersRouter } = require("./users-router");
const { topicsRouter } = require("./topics-router");
const { testRouter } = require("./kata-test-router");
//Require in routers the come off of this point

apiRouter.use("/", endpointsRouter);
apiRouter.use("/katas", katasRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/test", testRouter);
/* Adv
apiRouter.use("/solutions", solutionsRouter)
*/
export default apiRouter;
