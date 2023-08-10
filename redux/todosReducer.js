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
      const {id, isComplete } = action.payload;
      state.listData[id].completed = isComplete;
    },

    editTodoAction: (state, action) => {
      const id = action.payload.id;
      state.listData[id] = { ...action.payload};
    },

    showEditForm: (state, action) => {
      const {id, isEditFormVisible} = action.payload;
      state.listData[id].isEditFormVisible = isEditFormVisible;
    },

    changeSortBy: (state, action) => {
      const sortBy = action.payload;
      const todosArray = Object.values(state.listData);
      todosArray.map((todo) => {
        todo.sortBy = sortBy;
      })
    }
  },
});

export const { addTodo, deleteTodo, completeTodo, editTodoAction, showEditForm, changeSortBy } = todosReducer.actions;
export default todosReducer.reducer;
