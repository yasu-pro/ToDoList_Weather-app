import React from "react";
import Todo from "../types/Todo";
import AllTodoDataProps from '../types/AllTodoDataProps';
import SortOptions from '../utils/SortOptions';
import TodoItem from "./TodoItem";

const TodoList: React.FC<AllTodoDataProps> = ({ allTodoData }: AllTodoDataProps) => {
    const sortedListData:Todo[] = SortOptions({ ListData: allTodoData.ListData, OptionData: allTodoData.OptionData });

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
