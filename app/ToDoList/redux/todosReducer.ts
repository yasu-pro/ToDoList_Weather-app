import AllTodoDataProps from "../types/AllTodoDataProps";
import Todo from "../types/Todo";
import TodoOptionData from "../types/TodoOptionData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AllTodoDataProps = {
    allTodoData: {
        OptionData: {
            sortBy: "addOrder",
            sortOrder: "asc",
        },
        ListData: {},
    },
};

const todosReducer = createSlice({
    name: "todos",
    initialState: initialState,
    reducers: {
        loadTodos: (state) => {
            const storedDataString = localStorage.getItem("todos");
            const storedData = storedDataString ? JSON.parse(storedDataString) : null;
            state.allTodoData = storedData || {
                OptionData: {
                    sortBy: "addOrder",
                    sortOrder: "asc",
                },
                ListData: {},
            };
        },
        addTodo: (state, action: PayloadAction<Todo>) => {
            const { id, ...payload } = action.payload;
            state.allTodoData.ListData[id] = { id, ...payload };
            localStorage.setItem("todos", JSON.stringify(state.allTodoData));
        },

        deleteTodo: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            if (state.allTodoData.ListData) {
                delete state.allTodoData.ListData[id];
            }
            localStorage.setItem("todos", JSON.stringify(state.allTodoData));
        },

        completeTodo: (state, action: PayloadAction<{ id: string; isComplete: boolean }>) => {
            const { id, isComplete } = action.payload;
            if (state.allTodoData.ListData) {
                state.allTodoData.ListData[id].completed = isComplete;
            }
            localStorage.setItem("todos", JSON.stringify(state.allTodoData));
        },

        editTodoAction: (state, action: PayloadAction<Todo>) => {
            const { id, ...payload } = action.payload;
            if (state.allTodoData.ListData) {
                state.allTodoData.ListData[id] = { id, ...payload };
            }
            localStorage.setItem("todos", JSON.stringify(state.allTodoData));
        },

        showEditForm: (state, action: PayloadAction<{ id: string; isEditFormVisible: boolean }>) => {
            const { id, isEditFormVisible } = action.payload;
            if (state.allTodoData.ListData) {
                state.allTodoData.ListData[id].isEditFormVisible = isEditFormVisible;
            }
            localStorage.setItem("todos", JSON.stringify(state.allTodoData));
        },

        changeSort: (state, action: PayloadAction<TodoOptionData>) => {
            const { sortBy, sortOrder } = action.payload;
            state.allTodoData.OptionData.sortBy = sortBy;
            state.allTodoData.OptionData.sortOrder = sortOrder;
            localStorage.setItem("todos", JSON.stringify(state.allTodoData));
        },

        clearAllTodos: (state) => {
            state.allTodoData.ListData = {};
            localStorage.setItem("todos", JSON.stringify(state.allTodoData));
        },
    },
});

export const { loadTodos, addTodo, deleteTodo, completeTodo, editTodoAction, showEditForm, changeSort, clearAllTodos } = todosReducer.actions;
export default todosReducer.reducer;
