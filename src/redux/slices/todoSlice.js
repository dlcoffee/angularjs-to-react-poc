import { setAutoFreeze } from "immer";
import { v4 as uuidv4 } from "uuid";
setAutoFreeze(false);

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    {
      id: uuidv4(),
      title: "learn angular with redux",
    },
    {
      id: uuidv4(),
      title: "get redbull",
    },
  ],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (draftState, action) => {
      draftState.todos.push({
        id: uuidv4(),
        title: action.payload,
        completed: false,
      })
    },
    removeTodo: (draftState, action) => {
      draftState.todos = draftState.todos.filter((_, idx) => idx !== action.payload);
    },
    toggleTodo: (draftState, action) => {
      draftState.todos[action.payload].completed = !draftState.todos[action.payload].completed;
    },
    editTitle: (draftState, action) => {
      const edited = draftState.todos.find(
        (todo) => todo.id === action.payload.id
      );
      edited.title = action.payload.title;
    },
  },
});

export const { addTodo, editTitle, removeTodo, toggleTodo } = todoSlice.actions;

export default todoSlice.reducer;
