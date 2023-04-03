const express = require("express");

const routes = express.Router();
const { ctrl } = require("../controllers/TaskController");

routes.route("/").get(ctrl.getTasks).post(ctrl.createTask);
routes
  .route("/:id")
  .get(ctrl.getTask)
  .delete(ctrl.deleteTask)
  .put(ctrl.updateTaskStatus);

module.exports = routes;
