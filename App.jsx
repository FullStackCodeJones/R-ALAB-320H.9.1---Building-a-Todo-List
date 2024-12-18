import React, { useReducer, useState } from "react";
import "./App.css";

// 1. Defining the initial list of todo items
const initialState = [
  { id: 1, title: "Find that missing sock", completed: false },
  { id: 2, title: "Write some code", completed: true },
  { id: 3, title: "Meditate for 10 minutes", completed: false },
];

// 2. Defining the reducer function
function todoReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return [
        { id: Date.now(), title: action.payload, completed: false },
        ...state,
      ];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    case "EDIT_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.title }
          : todo
      );
    default:
      return state;
  }
}

function App() {
  // 3. Here I want to use the useReducer hook to manage the todos
  const [todos, dispatch] = useReducer(todoReducer, initialState);
  // 4. Then I will handle the state changes
  //6. Coming back to add useState to manage new todo inputs
  const [newTodo, setNewTodo] = useState("");
  // 7. Adding an editingTodo to track which todo is being edited
  const [editingTodo, setEditingTodo] = useState(null);
  //8. This is going to store the editing title of the todo
  const [editedTitle, setEditedTitle] = useState("");
  //10. This will handle the error handling and the editing
  const [error, setError] = useState("");

  function handleEdit(todo) {
    setError(""); // Clear any previous errors
    setEditingTodo(todo);
    setEditedTitle(todo.title); // It'll prefill the input with the current title
  }

  function handleSaveEdit(id) {
    if (editedTitle.trim()) {
      dispatch({
        type: "EDIT_TODO",
        payload: { id, title: editedTitle },
      });
      setEditingTodo(null); // Clears the input state
      setEditedTitle(""); // Clears the input field
      setError(""); // Clear any previous errors
    } else {
      setError("Edited title cannot be empty!"); // Show error if input is invalid
    }
  }

  function handleAddTodo(e) {
    e.preventDefault(); // Prevents the page from refreshing
    if (newTodo.trim()) {
      // Only add if input is not empty
      dispatch({ type: "ADD_TODO", payload: newTodo });
      setNewTodo(""); // Clear input after submission
      setError(""); // Clear any previous errors
    } else {
      setError("Todo title cannot be empty!"); // Show error if input is invalid
    }
  }

  return (
    <div>
      <h1>Randi's Todo List</h1>

      {/* Display Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Add Todo Form */}
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add A New Todo"
        />
        <button type="submit">Add Todo</button>
      </form>

      {/* Render the list of todos */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingTodo && editingTodo.id === todo.id ? (
              <>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(todo.id)}>Save</button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() =>
                    dispatch({ type: "TOGGLE_TODO", payload: todo.id })
                  }
                />
                {todo.title}
                <button
                  onClick={() =>
                    dispatch({ type: "DELETE_TODO", payload: todo.id })
                  }
                  disabled={todo.completed}
                >
                  Delete
                </button>
                <button onClick={() => handleEdit(todo)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

//initialState is the starting list of the todo items with id, title, and completed fields
//todoReducer is the function that is taking the current state and an action and returning a new state based on the action type.
//ADD_TODO: adds a new item
//TOGGLE_TODO: Marks a todo as completed
//DELETE_TODO: Removes a completed todo
//EDIT_TODO: Edits the title of a todo
//===============================================
//useReducer(todoReducer, initialState) is initializing the state with the initialState and is providing a dispatch function to send actions
//The delete button is disabled if the todo list isn't complete
