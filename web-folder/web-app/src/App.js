import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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
      description: "if you see this, something wrong",
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
              <h1
                style={{
                  color: themeColor[theme + "Theme"].primary[400],
                }}
              >
                Todo list
              </h1>
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
            <div className={"mainPage"}>
              <div
                className={"AddTaskBar"}
                style={{
                  "background-color": themeColor[theme + "Theme"].primary[200],
                  color: themeColor[theme + "Theme"].primary[400],
                }}
              >
                <h3>Create new task</h3>
                <TaskForm
                  updateTodoListFlag={updateTodoListFlag}
                  setUpdateTodoListFlag={setUpdateTodoListFlag}
                  setTheme={setTheme}
                />
              </div>
              <div className="allTaskBar">
                <div>
                  <h2
                    style={{
                      color: themeColor[theme + "Theme"].primary[400],
                    }}
                  >
                    Todo List
                  </h2>
                  <TodoList
                    todoList={todoList.filter((task) => task.status === "TODO")}
                    removeTask={removeTask}
                    doneTask={doneTask}
                  />
                </div>

                <div>
                  <h2
                    style={{
                      color: themeColor[theme + "Theme"].primary[400],
                    }}
                  >
                    Done List
                  </h2>
                  <TodoList
                    todoList={todoList.filter((task) => task.status === "DONE")}
                    removeTask={removeTask}
                  />
                </div>
              </div>
            </div>
          </div>
        </apiUrlContext.Provider>
      </themeContext.Provider>
    </LocalizationProvider>
  );
}

export default App;
