import React from "react";
import Todo from "../types/Todo";
import TodoListProps from '../types/TodoListProps';
import SortOptions from '../utils/SortOptions';
import TodoItem from "./TodoItem";

const TodoList:React.FC<TodoListProps> = ({ allTodoData }: TodoListProps) => {
    const sortedListData:Todo[] = SortOptions( allTodoData );

    return (
        <ul className="pt-3 pb-3 pl-0 pr-0 mx-auto md:pt-5 md:pr-5 md:pb-5 md:pl-5">
            {sortedListData.length > 0 ? (
                sortedListData.map((todo) => <TodoItem key={todo.id} todo={todo} />)
            ) : (
                <p className="text-lg text-center">Todoを追加してください。</p>
            )}
        </ul>
    )
}

export default TodoList;
