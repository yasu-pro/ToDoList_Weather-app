"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/store";
import { loadTodos } from "./redux/todosReducer";
// Component Section
import AddTodoForm from "./components/AddTodoForm";
import ClearAllButton from "./components/ClearAllButton";
import SortButtonGroup from "./components/SortButtonGroup";
import TodoList from "./components/TodoList";
import TodoSummary from "./components/TodoSummary";

export default function TodoApp() {
    const allTodoData = useSelector((store: RootState) => store.todos.allTodoData);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadTodos());
    }, [dispatch]);

    return (
        <>
            <TodoList allTodoData={allTodoData} />
            <div className="grid gap-5 md:grid-cols-2 md:gap-10">
                <AddTodoForm />
                <div className="order-1 md:order-2 pt-5 border-t border-rgba-[209,213,219] md:pt-0 md:border-t-0">
                    <SortButtonGroup />
                    <ClearAllButton />
                    <TodoSummary allTodoData={allTodoData} />
                </div>
            </div>
        </>
    );
}
