import React from "react";
import "../style/Button.css";

export default function Todo(props) {
  const { value, onClickRemove } = props;
  return (
    <div>
      {value}
      <button class="RemoveButton" onClick={onClickRemove}>
        Remove
      </button>
    </div>
  );
}
