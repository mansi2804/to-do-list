// IMPORTS
import React, { useState, useEffect } from "react";
import "./App.css";
// Define the priority levels
const priorityLevels = ["High", "Medium", "Low"];
// SVG ICONS
let AddIcon = () => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    height="24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z"
      fill="#282828"
    ></path>
  </svg>
);

let CheckIcon = () => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    height="24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.6644 5.25259C21.0772 5.61951 21.1143 6.25158 20.7474 6.66437L10.0808 18.6644C9.89099 18.8779 9.61898 19 9.33334 19C9.04771 19 8.7757 18.8779 8.58593 18.6644L3.2526 12.6644C2.88568 12.2516 2.92286 11.6195 3.33565 11.2526C3.74843 10.8857 4.3805 10.9229 4.74742 11.3356L9.33334 16.4948L19.2526 5.33564C19.6195 4.92286 20.2516 4.88568 20.6644 5.25259Z"
      fill="#fff"
    ></path>
  </svg>
);

let DeleteIcon = () => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    height="24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 4C7 2.89543 7.89543 2 9 2H15C16.1046 2 17 2.89543 17 4V6H18.9897C18.9959 5.99994 19.0021 5.99994 19.0083 6H21C21.5523 6 22 6.44772 22 7C22 7.55228 21.5523 8 21 8H19.9311L19.0638 20.1425C18.989 21.1891 18.1182 22 17.0689 22H6.93112C5.88184 22 5.01096 21.1891 4.9362 20.1425L4.06888 8H3C2.44772 8 2 7.55228 2 7C2 6.44772 2.44772 6 3 6H4.99174C4.99795 5.99994 5.00414 5.99994 5.01032 6H7V4ZM9 6H15V4H9V6ZM6.07398 8L6.93112 20H17.0689L17.926 8H6.07398ZM10 10C10.5523 10 11 10.4477 11 11V17C11 17.5523 10.5523 18 10 18C9.44772 18 9 17.5523 9 17V11C9 10.4477 9.44772 10 10 10ZM14 10C14.5523 10 15 10.4477 15 11V17C15 17.5523 14.5523 18 14 18C13.4477 18 13 17.5523 13 17V11C13 10.4477 13.4477 10 14 10Z"
      fill="#d0cfd3"
    ></path>
  </svg>
);

// APP
function App() {
  // STATES
  let [input, setInput] = useState("");
  let [tasks, setTasks] = useState([]);
  let [selectedPriority, setSelectedPriority] = useState("Low"); // Add selectedPriority state
  let [notes, setNotes] = useState("");

  // EFFECT
  useEffect(() => {
    if (localStorage.getItem("tasks")) {
      setTasks(JSON.parse(localStorage.getItem("tasks")));
    }
    let width = window.innerWidth;
   // let height = window.innerHeight;
   
    let backgrounds = [
      'https://plus.unsplash.com/premium_photo-1683309563255-fef9e541cdec?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];

    if (width > 425) {
      document.body.style.backgroundImage = `url(${
        backgrounds[Math.floor(Math.random() * backgrounds.length)]
      })`;
    }
  }, []);

  // locally set tasks
  function setLocal(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // change input value
  function handleChange(e) {
    setInput(e.target.value);
  }
  // handling priority change
function handlePriorityChange(e) {
  setSelectedPriority(e.target.value);
}
  // handling completed task
  function handleCheck(index, check) {
    let _tasks = tasks.map((item) => {
      if (item.id === index) {
        return {
          ...item,
          check,
        };
      }
      return item;
    });

    setTasks(_tasks);
    setLocal(_tasks);
  }

  // handling form submission
  function handleSubmit(e) {
    e.preventDefault();

    if (input.trim() !== "") {
      let newTask = {
        id: new Date().getTime() + Math.random(),
        check: false,
        task: input,
        priority: selectedPriority,
        notes: notes // Add notes to the new task
      };
      setTasks([...tasks, newTask]);
      setLocal([...tasks, newTask]);
      setInput("");
      setNotes(""); // Clear notes after submission
      document.querySelector(".form__input").focus();
    } else {
      setInput("");
    }
  }

  // handling deletion
  function handleDelete({ target: t }) {
    let _tasks = tasks.filter((i) => i.id !== t.getAttribute("data-index") * 1);
    setTasks(_tasks);
    setLocal(_tasks);
  }

  // JSX
  return (
    <main className="app">
      {/* heading */}
      <h1 className="heading">To-Do List</h1>
      <p className="heading__credit">
      Every task completed today is a step closer to your dreams tomorrow.
      </p>

      {/* form */}
      <div className="form-container">
        <p className="form-label">"Select priority for each task as you list them for today's accomplishments."</p>
        <form onSubmit={(e) => handleSubmit(e)} className="form">
          <input
            type="text"
            value={input}
            onChange={handleChange}
            className="form__input"
            required={true}
            spellCheck={false}
          />
      {/* Dropdown menu for priority levels */}
        <select value={selectedPriority} onChange={handlePriorityChange} className="form__priority">
          {priorityLevels.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      {/* Textarea for additional notes */}
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="form__notes"
        placeholder="Add additional notes or descriptions"
      />
          <button className="form__btn">
            <AddIcon />
          </button>
        </form>
      </div>

      {/* tasks */}
      <ul>
        {tasks.length < 1 ? (
          <p className="task-msg">So far, no task has been added. Would you like to add one now?</p>
        ) : (
          tasks.map((item) => (
            <li key={item.id} className="task">
              <div
                className="task__design"
                style={{
                  backgroundColor: item.check ? "#6971dd" : "inherit",
                  borderColor: item.check ? "#6971dd" : "#b3b3b3",
                }}
              >
                <input
                  type="checkbox"
                  id={item.id}
                  defaultChecked={item.check}
                  onChange={(e) => handleCheck(item.id, e.target.checked)}
                  className="task__input"
                />
                {item.check ? <CheckIcon /> : undefined}
              </div>
              <label
                htmlFor={item.id}
                className="task__label"
                style={{ textDecoration: item.check ? "line-through" : "none" }}
              >
                {item.task} - {item.priority} {/* Display the priority level */}
                {item.notes && <p>{item.notes}</p>} {/* Display notes if available */}
              </label>
              <button
                data-index={item.id}
                onClick={handleDelete}
                className="task__button"
              >
                <DeleteIcon />
              </button>
            </li>
          ))
        )}
      </ul>

      {/* info */}
      <div className="info">
        <p>
          Total Task(s): <strong>{tasks.length}</strong>
        </p>
      </div>
    </main>
  );
}

export default App;
