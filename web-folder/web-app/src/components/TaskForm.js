import React from "react";
import "../style/Button.css";
import "../style/TaskForm.css";

export default function TaskForm(props) {
  const {
    inputTaskTitle,
    inputTaskDescription,
    inputTaskDueDate,
    onChangeInputTaskTitle,
    onChangeInputTaskDescription,
    onChangeInputDueDate,
    addTask,
  } = props;
  return (
    <div className="AddTaskContainer">
      <form className="AddTaskForm">
        <label htmlFor="title">Task title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={inputTaskTitle}
          onChange={onChangeInputTaskTitle}
        />
        <label htmlFor="description">Task description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={inputTaskDescription}
          onChange={onChangeInputTaskDescription}
        />
        <label htmlFor="dueDate">Task due date:</label>
        <input
          type="text"
          id="dueDate"
          name="dueDate"
          value={inputTaskDueDate}
          onChange={onChangeInputDueDate}
        />
      </form>

      <button className="AddButton" onClick={addTask}>
        Add
      </button>
    </div>
  );
}
