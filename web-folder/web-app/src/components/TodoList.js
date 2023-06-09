import React from "react";
import Task from "./Task";
import "../style/TodoList.css";

export default function TodoList(props) {
  const { todoList, removeTask, doneTask } = props;
  return (
    <div className="TodoListContianer">
      {todoList.map((task, index) => {
        const options = { day: "numeric", month: "numeric", year: "numeric" };
        const dueDate = new Date(task.dueDate).toLocaleDateString(
          "en-GB",
          options
        );

        return (
          <Task
            key={index}
            title={task.title}
            description={task.description}
            status={task.status}
            dueDate={"Due Date: " + dueDate}
            onClickRemove={() => removeTask(task._id)}
            onClickDone={() => doneTask(task._id)}
          />
        );
      })}
    </div>
  );
}
