import React, { useState } from "react";
import "./style/App.css";
import "./style/Button.css";
import TodoList from "./components/TodoList";
import TaskForm from "./components/TaskForm";

function App() {
  const [todoList, setTodoList] = useState(["template task"]);

  //TaskForm state
  const [inputTaskTitle, setTaskTitle] = useState("a task");
  const [inputTaskDescription, setTaskDescription] = useState("a description");
  const [inputTaskDueDate, setTaskDueDate] = useState("a due date");
  //const [TaskStatus, setTaskStatus] = useState("TODO");

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
    setTodoList([...todoList, inputTaskTitle]);

    //clear text
    setTaskTitle("");
    setTaskDescription("");
    setTaskDueDate("");
  };

  const removeTask = (index) => {
    console.log("removeTask: " + index);

    let newTodoList = [...todoList];

    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  };

  return (
    <div class="App">
      <div class="NavigateBar">
        <h1>Todo list</h1>
      </div>
      <div class="AddTaskBar">
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
    </div>
  );
}

export default App;
