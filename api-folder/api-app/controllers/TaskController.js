const Task = require("../models/Task");
const mongoose = require("mongoose");

const ctrl = {
  // GET /tasks
  getTasks: async (req, res) => {
    console.log("getTasks");

    const total = await Task.countDocuments();
    console.log("total", total);

    Task.find()
      .then((tasks) => res.status(200).json(tasks))
      .catch((e) => res.status(500).json(e));
  },

  // GET /tasks/:id
  getTask: async (req, res) => {
    const { id } = req.params;
    console.log("getTask", id);
    Task.findById(id)
      .then((task) => res.status(200).json(task))
      .catch((e) => res.status(500).json(e));
  },

  // POST /tasks
  createTask: async (req, res) => {
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
      .catch((e) => res.status(500).json(e));
  },

  //DELETE /tasks/:id
  deleteTask: async (req, res) => {
    const { id } = req.params;
    Task.findByIdAndDelete(id)
      .then((task) => res.status(200).json(task))
      .catch((e) => res.status(500).json(e));
  },
};

module.exports = { ctrl };
