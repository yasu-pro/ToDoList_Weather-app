import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ sortedListData }) => {

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
