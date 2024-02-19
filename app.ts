const express = require("express");
const app = express();
const apiRouter = require("./routes/api-router");

/* needed later

app.use(cors())
app.use(express.json())
*/

app.use("/api", apiRouter);

module.exports = app;
