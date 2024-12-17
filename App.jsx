import React, { useReducer, useState } from "react";

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
  // 3. Here I want to use the useReducer hook to magae the todos
  const [todos, dispatch] = useReducer(todoReducer, initialState);
  // 4. Then I will handle the state changes
  //6. Coming back to add useState to manage new todo inputs
  const [newTodo, setNewTodo] = useState("");
  return (
    <div>
      <h1>Randi's Todo List</h1>

      {/* Add Todo Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevents the page from refreshing
          if (newTodo.trim()) {
            // Only add if input is not empty
            dispatch({ type: "ADD_TODO", payload: newTodo });
            setNewTodo(""); // Clear input after submission
          }
        }}
      >
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
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;

//inistialSTate is the starting list of the todo items with id, title, and completed fields
//todoReducer is the function that is taking the current state and an action and returning a new state based on the action type.
//ADD_TODO: adds a new item
//TOGGLE_TODO: MArks a todo as completed
//DELETE_TODO: Removes a completed todo
//EDIT_TODO: Edits the title of a todo
//===============================================
//useREducer(todoREducer, initalState) is initialzing the state with the initialState and is providing a dispatch function to send actions
//The delete button is disabled if the todo list isn't complete
