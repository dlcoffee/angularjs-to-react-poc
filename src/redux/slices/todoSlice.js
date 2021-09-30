import { setAutoFreeze } from "immer";
setAutoFreeze(false);

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    {
      title: "learn angular with redux",
    },
    {
      title: "get redbull",
    },
  ],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (draftState, action) => {
      draftState.todos.push({ title: action.payload, completed: false });
    },
    removeTodo: (draftState, action) => {
      draftState.todos = draftState.todos.filter((_, idx) => idx !== action.payload);
    },
    toggleTodo: (draftState, action) => {
      draftState.todos[action.payload].completed = !draftState.todos[action.payload].completed;
    },
  },
});

export const { addTodo, removeTodo, toggleTodo } = todoSlice.actions;

export default todoSlice.reducer;
