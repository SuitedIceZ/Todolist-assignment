import React from "react";

const Todo = (props) => {
  return (
    <div>
      {props.value}
      <button onClick={props.onClickRemove}>Remove</button>
    </div>
  );
};

export default Todo;
