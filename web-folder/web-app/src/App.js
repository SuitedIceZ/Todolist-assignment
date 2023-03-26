import React, { useState } from "react";
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
    <div>
      <h1>My First React App</h1>
      <div>
        <input type="text" value={inputText} onChange={onChangeInputText} />
        <button onClick={addTask}>Add</button>
      </div>

      <div>
        <TodoList todoList={todoList} removeTask={removeTask} />
      </div>
    </div>
  );
}

export default App;
