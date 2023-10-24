import React from "react";

export default function Todo(...props) {
  <div className="todo-items">
    {items.map((item) => {
      return (
        <>
          <div className="items-container">
            <div className="item" key={item.id}>
              <h2 className="todo-title">{item.value}</h2>
              <p className="todo-description">{item.discrption}</p>
            </div>
            <div className="buttons-container">
              <i
                className="fa-solid fa-trash delete-button"
                onClick={() => deleteItem(item.id)}
              ></i>
              <i
                className="fa-solid fa-check complete-button"
                onClick={() => completeItem(item.id)}
              ></i>
            </div>
          </div>
        </>
      );
    })}
  </div>;
}
