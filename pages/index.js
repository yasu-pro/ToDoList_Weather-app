import React from "react";
import Layout from "../components/layout";
import AddTodoForm from "../components/AddTodoForm"
import TodoList from "../components/TodoList";
import TodoSummary from "../components/TodoSummary";
import SortButtonGroup from "../components/SortButtonGroup";
import ClearAllButton from "../components/ClearAllButton";
import { useSelector } from "react-redux";

export default function Home() {
    const allTodoListData = useSelector((store) => store.todos.listData);
    const listData = allTodoListData ? Object.values(allTodoListData) : [];
    return (
        <Layout>
            <div>
                <TodoList todos={listData} />
                <AddTodoForm />
                <TodoSummary todos={listData}/>
                <SortButtonGroup todos={listData}/>
                <ClearAllButton />
            </div>
        </Layout>
    )
}
