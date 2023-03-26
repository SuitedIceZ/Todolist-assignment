import React from "react";
import Todo from "./Todo";
const TodoList = (props) => {
  return (
    <div>
      {props.todoList.map((task, index) => {
        return (
          <Todo
            key={index}
            value={task}
            onClickRemove={() => props.removeTask(index)}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
