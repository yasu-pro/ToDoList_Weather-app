import React from "react";
import SortOptions from '../utils/SortOptions';
import TodoItem from "./TodoItem";

const TodoList = ({ allTodoData }) => {
    const sortedListData = SortOptions( allTodoData );

    return (
        <ul className="mx-auto pt-3 pr-0 pb-3 pl-0 md:pt-5 md:pr-5 md:pb-5 md:pl-5">
            {sortedListData.length > 0 ? (
                sortedListData.map((todo) => <TodoItem key={todo.id} todo={todo} />)
            ) : (
                <p className="text-center text-lg">Todoを追加してください。</p>
            )}
        </ul>
    )
}

export default TodoList;
