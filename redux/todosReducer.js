import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const todosReducer = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },

    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },

    completeTodo: (state, action) => {
      return state.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, completed: true };
        }
        else
          return todo;
        }
      )
    },
  },
});

export const { addTodo, deleteTodo, completeTodo } = todosReducer.actions;
export default todosReducer.reducer;
