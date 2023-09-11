import React from "react";
import { useSelector } from "react-redux";
// Component Section
import AddTodoForm from "../components/AddTodoForm"
import ClearAllButton from "../components/ClearAllButton";
import Layout from "../components/layout";
import SortButtonGroup from "../components/SortButtonGroup";
import TodoList from "../components/TodoList";
import TodoSummary from "../components/TodoSummary";

export default function Home() {
    const allTodoData = useSelector(( store ) => store.todos.data);

    return (
        <Layout>
            <div className="p-3 md:p-12">
                <TodoList allTodoData={ allTodoData } />

                <div className="grid gap-5 md:grid-cols-2 md:gap-10">

                    <AddTodoForm />

                    <div className="order-1 md:order-2 pt-5 border-t border-rgba-[209,213,219] md:pt-0 md:border-t-0">
                        <SortButtonGroup />
                        <ClearAllButton />
                        <TodoSummary allTodoData={ allTodoData }/>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
