import React, { useContext } from "react";
import themeContext from "../context/theme";
import "../style/Button.css";
import "../style/Task.css";

export default function Task(props) {
  const { title, description, status, dueDate, onClickRemove, onClickDone } =
    props;
  const theme = useContext(themeContext);
  return (
    <div
      className={
        theme === "dark"
          ? "TaskCardContrainer-dark"
          : "TaskCardContrainer-light"
      }
    >
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
