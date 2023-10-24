import "./App.css";
import React, { useState, useEffect } from "react";
function App() {
  const body = document.querySelector("body");
  const storedItems = JSON.parse(localStorage.getItem("items")) || [];
  const storedCompItems =
    JSON.parse(localStorage.getItem("completeditems")) || [];
  const date = new Date();
  const time = date.toLocaleString("en-EG", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  let currentDate = date.toJSON();
  const [modle, setModle] = useState(false);
  const [exclamation, setExclamation] = useState(false);
  const [userDesc, setUserDesc] = useState("");
  const [userInput, setUserInput] = useState("");
  const [items, setItems] = useState(storedItems);
  const [completeditems, setCompleteditems] = useState(storedCompItems);
  const [completedList, setCompletedList] = useState(false);

  function overflowModle() {
    if (modle) {
      body.classList.add("overflow");
    } else {
      body.classList.remove("overflow");
    }
  }

  function Deleted() {
    setModle(false);
  }

  function handleCompletedBar() {
    setCompletedList(true);
  }

  function handleToDodBar() {
    setCompletedList(false);
  }

  function onSubmit(e) {
    e.preventDefault();
  }

  function handleChange(e) {
    e.preventDefault();
    setUserInput(e.target.value);
  }
  function handleChangeD(e) {
    e.preventDefault();
    setUserDesc(e.target.value);
  }
  const item = {
    id: Math.floor(Math.random() * 1000),
    value: userInput,
    discrption: userDesc,
    date: currentDate.slice(0, 10),
    time: time,
  };

  function addItem() {
    if (userInput.trim() === "") {
      return;
    }
    setItems((oldList) => [item, ...oldList]);
    setUserInput("");
    setUserDesc("");
  }

  function deleteItem(id) {
    const newArray = items.filter((item) => item.id !== id);
    const compItems = completeditems.filter((item) => item.id !== id);
    setItems(newArray);
    setCompleteditems(compItems);
    Deleted();
  }

  function Modle() {
    setModle(true);
  }

  function completeItem(id) {
    const compItem = items.filter((item) => item.id === id)[0];
    const deleteFromTodos = items.filter((item) => item.id !== id);
    setCompleteditems((preValue) => {
      return [compItem, ...preValue];
    });
    setItems(deleteFromTodos);
    setExclamation(true);
  }

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
    localStorage.setItem("completeditems", JSON.stringify(completeditems));
    if (completedList) {
      setExclamation(false);
    }
  }, [items, completeditems, completedList]);
  overflowModle();
  return (
    <>
      {modle && <div className="overlayer" onClick={Deleted}></div>}
      {modle && (
        <div className="modle">
          <div className="exit-button xmark" onClick={Deleted}>
            <i className="fa-solid fa-xmark "></i>
          </div>
          <div className="modle-container">
            <h2 className="modle-title">Delete task?</h2>
            <hr className="hr" />
            <p className="modle-text">
              Are you sure you want to delete this task?
            </p>
            <div className="molde-buttons-container">
              <div className="modle-buttons">
                <div>
                  {completedList === false && (
                    <span
                      className="modle-text modle-button modle-delete-button"
                      onClick={() => items.map((item) => deleteItem(item.id))}
                    >
                      Delete
                    </span>
                  )}
                  {completedList && (
                    <span
                      className="modle-text modle-button modle-delete-button"
                      onClick={() =>
                        completeditems.map((item) => deleteItem(item.id))
                      }
                    >
                      Delete
                    </span>
                  )}
                </div>
                <div>
                  <span
                    className="modle-text modle-button n-b"
                    onClick={Deleted}
                  >
                    No
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <h1 className="header">ToDo App List</h1>
      <div className="todo-container">
        <div className="App">
          <form onSubmit={onSubmit} className="input-container">
            <div className="inputs">
              <h3 className="title">Title:</h3>
              <input
                type="text"
                className="input"
                placeholder="Add the Title of your To Do"
                value={userInput}
                onChange={handleChange}
              />
            </div>
            <div className="inputs">
              <h3 className="title">Description:</h3>
              <input
                type="text"
                className="input mb-1"
                placeholder="Add the Description of your To Do"
                value={userDesc}
                onChange={handleChangeD}
              />
            </div>
            <div className="add-button-container  mb-1">
              <button className="add-button" onClick={addItem}>
                Add
              </button>
            </div>
          </form>

          <div className="todo-bar">
            <div
              className="items-bar"
              style={{
                backgroundColor:
                  completedList === false ? "#a32cc4" : " inherit",
              }}
              onClick={handleToDodBar}
            >
              <p className="bar-title">To Do</p>
            </div>
            <div
              className="completed-bar"
              style={{
                backgroundColor: completedList ? "#a32cc4" : " inherit",
              }}
              onClick={handleCompletedBar}
            >
              {exclamation && (
                <span className="exclamation-mark">
                  <i className="fa-solid fa-circle-exclamation exclamation"></i>
                </span>
              )}
              <p className="bar-title">Completed</p>
            </div>
          </div>
          {completedList === false && (
            <div className="todo-items">
              {items.map((item) => {
                return (
                  <>
                    <div className="items-container" key={item.id}>
                      <div className="item">
                        <h2 className="todo-title">
                          <strong>Title: </strong> {item.value}
                        </h2>
                        <p className="todo-description">
                          <strong>Description: </strong> {item.discrption}
                        </p>
                        <p className="date">
                          <strong>Date: </strong>
                          {item.date}
                          <strong> at</strong> {item.time}
                        </p>
                      </div>
                      <div className="buttons-container">
                        <i
                          className="fa-solid fa-trash n-b delete-button"
                          onClick={Modle}
                        ></i>
                        <i
                          className="fa-solid fa-check complete-button modle-delete-button"
                          onClick={() => completeItem(item.id)}
                        ></i>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          )}
          {completedList && (
            <div className="todo-comp-items">
              {completeditems.map((item) => {
                return (
                  <>
                    <div className="items-container" key={item.id}>
                      <div className="item">
                        <h2 className="todo-title completed-item">
                          Title: {item.value}
                        </h2>
                        <p className="todo-description completed-item">
                          Description: {item.discrption}
                        </p>
                        <p className="date">
                          Completed on {item.date} at {item.time}
                        </p>
                      </div>
                      <div className="buttons-container">
                        <i
                          className="fa-solid fa-trash n-b delete-button"
                          onClick={Modle}
                        ></i>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="footer">
        <span className="footer-text">
          &copy; 2023-2028 Ahmed Salah All Rights Reserved
        </span>
      </div>
    </>
  );
}

export default App;
