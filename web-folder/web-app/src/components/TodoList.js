import React from "react";
import Todo from "./Todo";

export default function TodoList(props) {
  const { todoList, removeTask } = props;
  return (
    <div>
      {todoList.map((task, index) => {
        return (
          <Todo
            key={index}
            value={task}
            onClickRemove={() => removeTask(index)}
          />
        );
      })}
    </div>
  );
}
