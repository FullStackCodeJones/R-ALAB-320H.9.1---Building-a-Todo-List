import React, { useReducer } from "react";

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

export default App;
