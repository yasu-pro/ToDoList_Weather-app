import AllTodoDataProps from '../types/AllTodoDataProps';
import Todo from "../types/Todo";
import TodoOptionData from '../types/TodoOptionData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AllTodoDataProps = {
  allTodoData: {
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
    addTodo: (state, action: PayloadAction<Todo>) => {
      const { id, ...payload } = action.payload;
        state.allTodoData.ListData[id] = { id, ...payload };
    },

    deleteTodo: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.allTodoData.ListData) {
        delete state.allTodoData.ListData[id];
      }
    },

    completeTodo: (state, action: PayloadAction<{ id: string; isComplete: boolean }>) => {
      const {id, isComplete } = action.payload;
      if (state.allTodoData.ListData) {
        state.allTodoData.ListData[id].completed = isComplete;
      }
    },

    editTodoAction: (state, action: PayloadAction<Todo>) => {
      const { id, ...payload } = action.payload;
      if (state.allTodoData.ListData) {
        state.allTodoData.ListData[id] = { id, ...payload };
      }
    },

    showEditForm: (state, action: PayloadAction<{ id: string; isEditFormVisible: boolean }>) => {
      const {id, isEditFormVisible} = action.payload;
      if (state.allTodoData.ListData) {
        state.allTodoData.ListData[id].isEditFormVisible = isEditFormVisible;
      }
    },

    changeSort: (state, action: PayloadAction<TodoOptionData>) => {
      const { sortBy, sortOrder } = action.payload;
      state.allTodoData.OptionData.sortBy = sortBy;
      state.allTodoData.OptionData.sortOrder = sortOrder;
    },

    clearAllTodos: (state) => {
      state.allTodoData.ListData = {}
    }
  },
});

export const { addTodo, deleteTodo, completeTodo, editTodoAction, showEditForm, changeSort, clearAllTodos } = todosReducer.actions;
export default todosReducer.reducer;
