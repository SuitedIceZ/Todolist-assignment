import React from "react";
import Task from "./Task";
import "../style/TodoList.css";

export default function TodoList(props) {
  const { todoList, removeTask } = props;
  return (
    <div class="TodoListContianer">
      {todoList.map((taskTitle, index) => {
        return (
          <Task
            key={index}
            title={taskTitle}
            onClickRemove={() => removeTask(index)}
          />
        );
      })}
    </div>
  );
}
