import React from "react";

export default function Todo(...todo) {
  return (
    <div>
      <input type="checkbox" checked={todo.completed} />
      <span>{todo.title}</span>
    </div>
  );
}
