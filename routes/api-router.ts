const apiRouter = require("express").Router();
//Require in routers the come off of this point

apiRouter.use("/", endpointsRouter);
apiRouter.use("/katas", katasRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/topics", topicsRouter);
/* Adv
apiRouter.use("/solutions", solutionsRouter)
apiRouter.use("/test", testRouter) 
*/
