import React from "react";
import { useSelector } from "react-redux";
import Layout from "../components/layout";
import AddTodoForm from "../components/AddTodoForm"
import TodoList from "../components/TodoList";
import TodoSummary from "../components/TodoSummary";
import SortButtonGroup from "../components/SortButtonGroup";
import ClearAllButton from "../components/ClearAllButton";
import layoutStyles from '../styles/layout.module.css';

export default function Home() {
    const allTodoListData = useSelector((store) => store.todos.listData);
    const listData = allTodoListData ? Object.values(allTodoListData) : [];
    return (
        <Layout>
            <div className={`${layoutStyles.container} md:pl-8 md:pr-8 sm:pl-6 sm:pr-6 pt-12 pb-12 pl-4 pr-4`}>
                <div className={`${layoutStyles.item} pt-5 pr-5 pb-5 pl-5`}>
                    <TodoList todos={listData} />
                </div>

                <div className={layoutStyles.gridContainer}>
                    
                    <AddTodoForm />
                    
                    <div className={layoutStyles.gridItem}>
                        <div className={layoutStyles.button}>
                            <SortButtonGroup todos={listData}/>
                            <div className="mt-5">
                                <ClearAllButton />
                            </div>
                        </div>
                        <div className="mt-7">
                            <TodoSummary className={layoutStyles.summary} todos={listData}/>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
