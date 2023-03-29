import React, { useContext, useState } from "react";
import "../style/Button.css";
import "../style/TaskForm.css";

import fetchUtil, { METHOD } from "../utils/Fetch";

import apiUrlContext from "../context/apiUrl";

export default function TaskForm(props) {
  const { updateTodoListFlag, setUpdateTodoListFlag } = props;
  const apiUrl = useContext(apiUrlContext);

  ////default value
  //get current date
  const defaultDueDate = new Date();
  const defaultTaskTitle = "Task title";
  const defaultTaskDescription = "Task description";

  ////TaskFrom state
  const [inputTaskTitle, setTaskTitle] = useState("");
  const [inputTaskDescription, setTaskDescription] = useState("");
  const [inputTaskDueDate, setTaskDueDate] = useState();
  ////TaskFrom event handler
  const onChangeInputTaskTitle = ({ target: { value } }) => {
    setTaskTitle(value);
  };
  const onChangeInputTaskDescription = ({ target: { value } }) => {
    setTaskDescription(value);
  };
  const onChangeInputDueDate = ({ target: { value } }) => {
    setTaskDueDate(value);
  };

  const addTask = () => {
    const newTask = {
      title: inputTaskTitle || defaultTaskTitle,
      description: inputTaskDescription || defaultTaskDescription,
      status: "TODO",
      dueDate: inputTaskDueDate || defaultDueDate,
    };
    console.log(newTask);
    fetchUtil(apiUrl + "/tasks", METHOD.POST, newTask).then((response) => {
      console.log(response);
      setUpdateTodoListFlag((updateTodoListFlag + 1) % 100);
    });

    //clear text
    setTaskTitle("");
    setTaskDescription("");
    setTaskDueDate("");
  };

  return (
    <div className="AddTaskContainer">
      <form className="AddTaskForm">
        <label htmlFor="title">Task title:</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder={defaultTaskTitle}
          value={inputTaskTitle}
          onChange={onChangeInputTaskTitle}
        />
        <label htmlFor="description">Task description:</label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder={defaultTaskDescription}
          value={inputTaskDescription}
          onChange={onChangeInputTaskDescription}
        />
        <label htmlFor="dueDate">Task due date:</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={inputTaskDueDate}
          onChange={onChangeInputDueDate}
        />
        <button className="AddButton" type="submit" onClick={addTask}>
          Add
        </button>
      </form>
    </div>
  );
}
