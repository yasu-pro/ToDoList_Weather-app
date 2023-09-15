import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {
    OptionData: {
      sortBy: "addOrder",
      sortOrder: "asc",
    },
    ListData: {},
  }
};

const todosReducer = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    addTodo: (state, action) => {
      const { id, ...payload } = action.payload;
      state.data.ListData[id] = { id, ...payload };
    },

    deleteTodo: (state, action) => {
      const id = action.payload;
      delete state.data.ListData[id];
    },

    completeTodo: (state, action) => {
      const {id, isComplete } = action.payload;
      state.data.ListData[id].completed = isComplete;
    },

    editTodoAction: (state, action) => {
      const { id, ...payload } = action.payload;
      state.data.ListData[id] = { id, ...payload };
    },

    showEditForm: (state, action) => {
      const {id, isEditFormVisible} = action.payload;
      state.data.ListData[id].isEditFormVisible = isEditFormVisible;
    },

    changeSort: (state, action) => {
      const { sortBy, sortOrder } = action.payload;
      state.data.OptionData.sortBy = sortBy;
      state.data.OptionData.sortOrder = sortOrder;
    },

    clearAllTodos: (state) => {
      state.data.ListData = {}
    }
  },
});

export const { addTodo, deleteTodo, completeTodo, editTodoAction, showEditForm, changeSort, clearAllTodos } = todosReducer.actions;
export default todosReducer.reducer;
