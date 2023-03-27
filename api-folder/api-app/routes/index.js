const expess = require("express");
const app = expess.Router();

const tasks = require("./tasks");

app.use("/tasks", tasks);

module.exports = app;
