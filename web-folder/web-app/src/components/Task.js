import React from "react";
import "../style/Button.css";
import "../style/Task.css";

export default function Task(props) {
  const { title, description, status, dueDate, onClickRemove, onClickDone } =
    props;
  return (
    <div className="TaskCardContrainer">
      <h4>
        <b>{title}</b>
      </h4>
      <p>{description}</p>
      <div id="statusAndDueDate">
        <p>{status}</p>
        <p>{dueDate}</p>
      </div>
      <div>
        {status === "TODO" && (
          <button className="DoneButton" onClick={onClickDone}>
            Done!
          </button>
        )}
        <button className="RemoveButton" onClick={onClickRemove}>
          Remove
        </button>
      </div>
    </div>
  );
}
