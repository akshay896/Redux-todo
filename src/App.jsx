import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, compelteTodo, deleteTodo } from "./redux/todoSlice";
import "./App.css";
import { Table } from "react-bootstrap";

function App() {
  const [text, setText] = useState("");
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (text.trim().length) {
      dispatch(addTodo(text));
      setText("");
    }
  };

  const completedTasksCount = todos.filter((todo) => todo.completed).length;

  return (
    <>
      <div className="text-center">
        <h1>My Todo List</h1>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <input
          className="form-control w-50"
          type="text"
          placeholder="Add todo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn btn-primary ms-2" onClick={handleAddTodo}>
          Submit
        </button>
      </div>
      <div className="content-container mt-3">
        <div className="w-75 m-auto">
          {todos.length > 0 ? (
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Completed</th>
                  <th>Task</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((todo) => (
                  <tr key={todo.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => dispatch(compelteTodo(todo.id))}
                      />
                    </td>
                    <td>
                      <p className={`ms-2 ${todo.completed ? "completed" : ""}`}>
                        {todo.text}
                      </p>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => dispatch(deleteTodo(todo.id))}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <h1
             className="text-center text-danger">No todos available</h1>
          )}
        </div>
      </div>
      <h3 className="text-center mt-4">
        Completed Tasks: <span className="text-success">{completedTasksCount}</span>
      </h3>
    </>
  );
}

export default App;
