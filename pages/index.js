import React from "react";
import Layout from "../components/layout";
import AddTodoForm from "../components/AddTodoForm"
import TodoList from "../components/TodoList";
import { useSelector } from "react-redux";

export default function Home() {
    const allTodoListData = useSelector((store) => store.todos.listData);
    const listData = allTodoListData ? Object.values(allTodoListData) : [];
    return (
        <Layout>
            <div>
                <TodoList todos={listData} />
                <AddTodoForm />
            </div>
        </Layout>
    )
}
