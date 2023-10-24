import React from "react";
import Todo from "./Todo";

function TodoList(...todos) {
  return (
    <div>
      {todos.map((todo) => {
        return <Todo key={todo.id} todo={todo} />;
      })}
    </div>
  );
}

export default TodoList;
