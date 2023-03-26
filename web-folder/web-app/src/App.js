import React, { useState } from "react";
import "./style/App.css";
import "./style/Button.css";
import TodoList from "./components/TodoList";
function App() {
  const [todoList, setTodoList] = useState(["task 1"]);
  const [inputText, setText] = useState("a task");

  const onChangeInputText = ({ target: { value } }) => {
    console.log("onChangeInputText: " + value);
    setText(value);
  };

  const addTask = () => {
    setTodoList([...todoList, inputText]);

    //clear text
    setText("");
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
        <input type="text" value={inputText} onChange={onChangeInputText} />
        <button class="AddButton" onClick={addTask}>
          Add
        </button>
      </div>

      <div>
        <TodoList todoList={todoList} removeTask={removeTask} />
      </div>
    </div>
  );
}

export default App;
