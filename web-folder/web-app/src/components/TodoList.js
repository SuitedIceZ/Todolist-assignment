import React from "react";
import Task from "./Task";
import "../style/TodoList.css";

export default function TodoList(props) {
  const { todoList, removeTask } = props;
  return (
    <div className="TodoListContianer">
      {todoList.map((task, index) => {
        return (
          <Task
            key={index}
            title={task.title}
            description={task.description}
            status={task.status}
            dueDate={task.dueDate}
            onClickRemove={() => removeTask(index)}
          />
        );
      })}
    </div>
  );
}
