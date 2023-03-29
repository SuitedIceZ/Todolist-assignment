import React, { useEffect, useState } from "react";
import "./style/App.css";
import "./style/Button.css";
import TodoList from "./components/TodoList";
import TaskForm from "./components/TaskForm";

import fetchUtil, { METHOD } from "./utils/Fetch";

function App() {
  //TODO: move to config file
  const apiUrl = "http://localhost:3013/api";

  const [todoList, setTodoList] = useState([
    {
      title: "template task",
      description: "template description",
      dueDate: "template due date",
      status: "TODO",
    },
  ]);

  ////START TaskForm region
  //TaskFrom state
  const [inputTaskTitle, setTaskTitle] = useState("a task");
  const [inputTaskDescription, setTaskDescription] = useState("a description");
  const [inputTaskDueDate, setTaskDueDate] = useState("a due date");
  const [TaskStatus, setTaskStatus] = useState("TODO");
  //TaskFrom event handler
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
      title: inputTaskTitle,
      description: inputTaskDescription,
      dueDate: inputTaskDueDate,
      status: TaskStatus,
    };
    setTodoList([...todoList, newTask]);

    //clear text
    setTaskTitle("");
    setTaskDescription("");
    setTaskDueDate("");
    setTaskStatus("TODO");
  };
  ////END TaskForm region

  //remove task event handler
  const removeTask = (index) => {
    console.log("removeTask: " + index);

    let newTodoList = [...todoList];

    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  };

  //Try fetching
  useEffect(() => {
    const requestUrl = apiUrl + "/tasks";
    console.log(
      "useEffect fetching at ",
      requestUrl,
      " with method ",
      METHOD.GET
    );
    fetchUtil(requestUrl, METHOD.GET, null).then((response) => {
      setTodoList(response);
      console.log(response);
    });
  }, [apiUrl]);

  return (
    <div className="App">
      <div className="NavigateBar">
        <div>username</div>
        <h1>Todo list</h1>
        <button id="themeToggleButton">Toggle light/dark theme</button>
      </div>
      <div className="AddTaskBar">
        <TaskForm
          inputTaskTitle={inputTaskTitle}
          inputTaskDescription={inputTaskDescription}
          inputTaskDueDate={inputTaskDueDate}
          onChangeInputTaskTitle={onChangeInputTaskTitle}
          onChangeInputTaskDescription={onChangeInputTaskDescription}
          onChangeInputDueDate={onChangeInputDueDate}
          addTask={addTask}
        />
      </div>

      <div>
        <TodoList todoList={todoList} removeTask={removeTask} />
      </div>

      <div>
        <h1>In-Progress Task</h1>
      </div>
    </div>
  );
}

export default App;
