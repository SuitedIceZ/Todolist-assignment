import React, { useContext, useState } from "react";
import { Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import "../style/Button.css";
import "../style/TaskForm.css";
import themeColor from "../config/themeColor";

import fetchUtil, { METHOD } from "../utils/Fetch";

import apiUrlContext from "../context/apiUrl";
import themeContext from "../context/theme";
import dayjs from "dayjs";

export default function TaskForm(props) {
  const { updateTodoListFlag, setUpdateTodoListFlag /*, setTheme */ } = props;
  const apiUrl = useContext(apiUrlContext);
  const theme = useContext(themeContext);

  ////default value
  //get current date
  const defaultDueDate = dayjs();
  const defaultTaskTitle = "Task title";
  const defaultTaskDescription = "Task description";

  ////TaskFrom state
  const [inputTaskTitle, setTaskTitle] = useState("");
  const [inputTaskDescription, setTaskDescription] = useState("");
  const [inputTaskDueDate, setTaskDueDate] = useState(null);

  ////TaskFrom event handler
  const onChangeInputTaskTitle = ({ target: { value } }) => {
    setTaskTitle(value);
  };
  const onChangeInputTaskDescription = ({ target: { value } }) => {
    setTaskDescription(value);
  };
  const onChangeInputDueDate = (event) => {
    console.log("setTaskDueDate : ", event);
    setTaskDueDate(event);
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
      <form /*className="AddTaskForm"*/>
        <TextField
          className="InputField"
          label="title"
          variant="outlined"
          value={inputTaskTitle}
          onChange={onChangeInputTaskTitle}
        />
        <TextField
          className="InputField"
          label="description"
          variant="outlined"
          value={inputTaskDescription}
          onChange={onChangeInputTaskDescription}
        />
        <DatePicker
          className="InputField"
          label="due date"
          variant="outlined"
          value={inputTaskDueDate}
          onChange={onChangeInputDueDate}
          format="DD/MM/YYYY" // specify the date format
        />
        <Button
          variant="contained"
          className="AddButton"
          style={{
            "background-color": themeColor[theme + "Theme"].primary[200],
            color: themeColor[theme + "Theme"].primary[400],
          }}
          onClick={addTask}
        >
          Create
        </Button>
      </form>
    </div>
  );
}
