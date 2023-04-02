import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";

import "./style/App.css";
import "./style/Button.css";
import themeColor from "./config/themeColor";
import TodoList from "./components/TodoList";
import TaskForm from "./components/TaskForm";

import fetchUtil, { METHOD } from "./utils/Fetch";

import apiUrlContext from "./context/apiUrl";
import themeContext from "./context/theme";

function App() {
  //TODO: move string hard code to config file
  const apiUrl = "http://localhost:3013/api";

  const [updateTodoListFlag, setUpdateTodoListFlag] = useState(0);
  const [todoList, setTodoList] = useState([
    {
      title: "template task",
      description: "template description",
      dueDate: "template due date",
      status: "TODO",
    },
  ]);
  const [theme, setTheme] = useState("dark");

  //remove task event handler
  const removeTask = (objectId) => {
    console.log("removeTask: " + objectId);

    fetchUtil(apiUrl + "/tasks/" + objectId, METHOD.DELETE, null).then(
      (response) => {
        console.log(response);
        setUpdateTodoListFlag((updateTodoListFlag + 1) % 100);
      }
    );
  };
  //change task status event handler
  const doneTask = (objectId) => {
    console.log("doneTask: " + objectId);

    fetchUtil(apiUrl + "/tasks/" + objectId, METHOD.PUT, {
      status: "DONE",
    }).then((response) => {
      console.log(response);
      setUpdateTodoListFlag((updateTodoListFlag + 1) % 100);
    });
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
  }, [apiUrl, updateTodoListFlag]);

  useEffect(() => {
    console.log("useEffect theme: " + theme);
  }, [theme]);

  return (
    <themeContext.Provider value={theme}>
      <apiUrlContext.Provider value={apiUrl}>
        <div
          className={"App"}
          style={{
            "background-color": themeColor[theme + "Theme"].primary[200],
          }}
        >
          <div
            className={"NavigateBar"}
            style={{
              background: themeColor[theme + "Theme"].primary[100],
            }}
          >
            <h1>Todo list</h1>
            <Button
              variant="contained"
              id="themeToggleButton"
              style={{
                "background-color": themeColor[theme + "Theme"].primary[200],
                color: themeColor[theme + "Theme"].primary[400],
              }}
              onClick={() => {
                setTheme(theme === "light" ? "dark" : "light");
              }}
            >
              Toggle light/dark theme
            </Button>
          </div>
          <div
            className={"AddTaskBar"}
            style={{
              "background-color": themeColor[theme + "Theme"].primary[200],
            }}
          >
            <TaskForm
              updateTodoListFlag={updateTodoListFlag}
              setUpdateTodoListFlag={setUpdateTodoListFlag}
              setTheme={setTheme}
            />
          </div>

          <div>
            <h1>Todo List</h1>
            <TodoList
              todoList={todoList.filter((task) => task.status === "TODO")}
              removeTask={removeTask}
              doneTask={doneTask}
            />
          </div>

          <div>
            <h1>Done List</h1>
            <TodoList
              todoList={todoList.filter((task) => task.status === "DONE")}
              removeTask={removeTask}
            />
          </div>
        </div>
      </apiUrlContext.Provider>
    </themeContext.Provider>
  );
}

export default App;
