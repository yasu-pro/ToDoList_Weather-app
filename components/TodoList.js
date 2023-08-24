import React from "react";
import TodoItem from "./TodoItem";
import SortOptions from "./SortOptions";

const TodoList = ({ todos }) => {

    const sortedTodos = SortOptions({todos})

    return (
        <ul className="mx-auto">
            {sortedTodos.length > 0 ? (
                sortedTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
            ) : (
                <p>Todoを追加してください。</p>
            )}
        </ul>
    )
}

export default TodoList;
