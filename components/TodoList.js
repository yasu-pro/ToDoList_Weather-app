import React from "react";
import TodoItem from "./TodoItem";
import SortOptions from '../components/SortOptions';

const TodoList = ( allTodoData ) => {
    const sortedListData = SortOptions( allTodoData );

    return (
        <ul className="mx-auto">
            {sortedListData.length > 0 ? (
                sortedListData.map((todo) => <TodoItem key={todo.id} todo={todo} />)
            ) : (
                <p>Todoを追加してください。</p>
            )}
        </ul>
    )
}

export default TodoList;
