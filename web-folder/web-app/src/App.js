import React, { useState } from "react";

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
  return (
    <div>
      <h1>My First React App</h1>
      <div>
        <input type="text" value={inputText} onChange={onChangeInputText} />
        <button onClick={addTask}>Add</button>
      </div>

      <div>
        <div>
          {todoList.map((task, index) => {
            return <div key={index}>{task}</div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
