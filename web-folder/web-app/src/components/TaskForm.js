import React, { useContext, useState } from "react";
import "../style/Button.css";
import "../style/TaskForm.css";
import themeColor from "../config/themeColor";

import fetchUtil, { METHOD } from "../utils/Fetch";

import apiUrlContext from "../context/apiUrl";
import themeContext from "../context/theme";

export default function TaskForm(props) {
  const { updateTodoListFlag, setUpdateTodoListFlag /*, setTheme */ } = props;
  const apiUrl = useContext(apiUrlContext);
  const theme = useContext(themeContext);

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
      //TODO: fix add task, the app will re render all so the theme will be reset
    });

    //clear text
    setTaskTitle("");
    setTaskDescription("");
    setTaskDueDate("");
  };

  return (
    <div
      className={"AddTaskContainer"}
      style={{ "background-color": themeColor[theme + "Theme"].primary[100] }}
    >
      <form className="AddTaskForm">
        <label htmlFor="title" style={{ color: "black" }}>
          Task title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder={defaultTaskTitle}
          value={inputTaskTitle}
          onChange={onChangeInputTaskTitle}
        />
        <label htmlFor="description" style={{ color: "black" }}>
          Task description:
        </label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder={defaultTaskDescription}
          value={inputTaskDescription}
          onChange={onChangeInputTaskDescription}
        />
        <label htmlFor="dueDate" style={{ color: "black" }}>
          Task due date:
        </label>
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
