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

    changeDueDate: (state, action) => {
      const { id, dueDate } = action.payload;

      return state.map((todo) => {
        if (todo.id === id) {
          return { ...todo, dueDate: dueDate };
        } else {
          return todo;
        }
      });
    },
  },
});

export const { addTodo, deleteTodo, completeTodo, changeDueDate } = todosReducer.actions;
export default todosReducer.reducer;
