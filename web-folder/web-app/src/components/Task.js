import React from "react";
import "../style/Button.css";
import "../style/Task.css";

export default function Todo(props) {
  const { title, onClickRemove } = props;
  return (
    <div class="TaskCardContrainer">
      <h4>
        <b>{title}</b>
      </h4>
      <p>description</p>
      <div id="statusAndDueDate">
        <p>status</p>
        <p>due date</p>
      </div>
      <div>
        <button class="DoneButton" onClick={onClickRemove}>
          Done!
        </button>
        <button class="RemoveButton" onClick={onClickRemove}>
          Remove
        </button>
      </div>
    </div>
  );
}
