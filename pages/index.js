import React from "react";
import { useSelector } from "react-redux";
import Layout from "../components/layout";
import AddTodoForm from "../components/AddTodoForm"
import TodoList from "../components/TodoList";
import TodoSummary from "../components/TodoSummary";
import SortButtonGroup from "../components/SortButtonGroup";
import ClearAllButton from "../components/ClearAllButton";
import SortOptions from "../components/SortOptions";

export default function Home() {
    const allTodoData = useSelector(( store ) => store.todos.data);
    const sortedListData = SortOptions({ allTodoData });

    return (
        <Layout>
            <div className="pt-3 pr-3 pb-3 pl-3 md:pt-12 md:pr-4 md:pb-12 md:pl-4">
                <div className="pt-3 pr-0 pb-3 pl-0 md:pt-5 md:pr-5 md:pb-5 md:pl-5">
                    <TodoList sortedListData={ sortedListData } />
                </div>

                <div className="grid gap-5 md:grid-cols-2 md:gap-10">

                    <AddTodoForm />

                    <div className="order-1 md:order-2 pt-5 border-t border-rgba-[209,213,219] md:pt-0 md:border-t-0">
                        <div>
                            <SortButtonGroup />
                            <div className="mt-5">
                                <ClearAllButton />
                            </div>
                        </div>
                        <div className="mt-0 md:mt-7">
                            <TodoSummary sortedListData={ sortedListData }/>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
