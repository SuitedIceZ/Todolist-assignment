import React from "react";
import Task from "./Task";

export default function TodoList(props) {
  const { todoList, removeTask } = props;
  return (
    <div>
      {todoList.map((task, index) => {
        return (
          <Task
            key={index}
            value={task}
            onClickRemove={() => removeTask(index)}
          />
        );
      })}
    </div>
  );
}
