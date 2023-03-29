import React from "react";
import Task from "./Task";
import "../style/TodoList.css";

export default function TodoList(props) {
  const { todoList, removeTask, doneTask } = props;
  return (
    <div className="TodoListContianer">
      {todoList.map((task, index) => {
        const dueDate = new Date(task.dueDate).toLocaleDateString();
        return (
          <Task
            key={index}
            title={task.title}
            description={task.description}
            status={task.status}
            dueDate={"Due Date: " + dueDate}
            onClickRemove={() => removeTask(index)}
            onClickDone={() => doneTask(index)}
          />
        );
      })}
    </div>
  );
}
