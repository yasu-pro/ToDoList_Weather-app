import React from "react";
import Layout from "../components/layout";
import AddTodoForm from "../components/AddTodoForm"
import TodoItem from "../components/TodoItem";
import TodoList from "../components/TodoList";

export default function Home({allTodoListData}) {
    return (
        <Layout>
            <div>
                <TodoList>
                    <TodoItem />
                </TodoList>
                <AddTodoForm />
            </div>
        </Layout>
    )
}
