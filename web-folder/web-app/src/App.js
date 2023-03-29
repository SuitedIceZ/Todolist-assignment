import React, { useEffect, useState } from "react";
import "./style/App.css";
import "./style/Button.css";
import TodoList from "./components/TodoList";
import TaskForm from "./components/TaskForm";

import fetchUtil, { METHOD } from "./utils/Fetch";

import apiUrlContext from "./context/apiUrl";

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

  return (
    <apiUrlContext.Provider value={apiUrl}>
      <div className="App">
        <div className="NavigateBar">
          <h1>Todo list Website</h1>
          <button id="themeToggleButton">Toggle light/dark theme</button>
        </div>
        <div className="AddTaskBar">
          <TaskForm
            updateTodoListFlag={updateTodoListFlag}
            setUpdateTodoListFlag={setUpdateTodoListFlag}
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
  );
}

export default App;
