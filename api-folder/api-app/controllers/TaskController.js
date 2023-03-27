const Task = require("../models/Task");
const mongoose = require("mongoose");

const ctrl = {
  // GET /tasks
  getTasks: async (req, res) => {
    res.status(200).json({ msg: "getTasks" });
    return "getTasks";
    Task.find()
      .then((tasks) => res.status(200).json(tasks))
      .catch((e) => res.error(e));
  },

  // GET /tasks/:id
  getTask: async (req, res) => {
    // return "getTask ${id}"
    const { id } = req.params;
    res.status(200).json({ msg: `getTask ${id}` });
    return `getTask ${id}`;
    Task.findById(id)
      .then((task) => res.status(200).json(task))
      .catch((e) => res.error(e));
  },

  // POST /tasks
  createTask: async (req, res) => {
    res.status(201).json({ msg: "createTask" });
    return "createTask";
    const { title, description, status, dueDate } = req.body;
    const task = new Task({
      title,
      description,
      status,
      dueDate,
    });
    task
      .save()
      .then((task) => res.status(201).json(task))
      .catch((e) => res.error(e));
  },

  //DELETE /tasks/:id
  deleteTask: async (req, res) => {
    const { id } = req.params;
    res.status(200).json({ msg: `deleteTask ${id}` });
    return `deleteTask ${id}`;
    Task.findByIdAndDelete(id)
      .then((task) => res.status(200).json(task))
      .catch((e) => res.error(e));
  },
};

module.exports = { ctrl };
