import { createSlice } from '@reduxjs/toolkit';

const initialState = { listData: {} };

const todosReducer = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    addTodo: (state, action) => {
      const id = action.payload.id;
      state.listData[id] = { ...action.payload, id};
    },

    deleteTodo: (state, action) => {
      const id = action.payload;
      delete state.listData[id];
    },

    completeTodo: (state, action) => {
      const id = action.payload;
      state.listData[id].completed = true;
    },

    changeDueDate: (state, action) => {
      const { id, dueDate } = action.payload;
      state.listData[id].dueDate = dueDate;
    },

    editTodoAction: (state, action) => {
      const id = action.payload.id;
      state.listData[id] = { ...action.payload};
    },

    showEditForm: (state, action) => {
      const {id, isEditFormVisible} = action.payload;
      state.listData[id].isEditFormVisible = isEditFormVisible;
    }
  },
});

export const { addTodo, deleteTodo, completeTodo, changeDueDate, editTodoAction, showEditForm } = todosReducer.actions;
export default todosReducer.reducer;
