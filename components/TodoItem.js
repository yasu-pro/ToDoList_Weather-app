import React, { useState } from "react";
import styles from './TodoItem.module.scss';
import { useDispatch } from 'react-redux';
import { format } from "date-fns"
import { deleteTodo, completeTodo, changeDueDate, showEditForm} from "../redux/todosReducer";
import ReactDatePicker from "./DatePicker";
import EditTodoForm from "./EditTodoForm"

const TodoItem = ({ todo }) => {
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteTodo(id))
    }

    const handleComplete = (id) => {
        dispatch(completeTodo(id))
    }

    const handleDateChange = (id, date) => {
        const formattedDate = format(date, "yyyy年MM月dd日");
        dispatch(changeDueDate({ id, dueDate: formattedDate }));
    };

    const handleIsEditFormVisible = (id, isShow) => {
        dispatch(showEditForm( {id, isEditFormVisible: isShow }))
    }

    return (
        <li key={todo.id} className={styles.li}>
            {todo.completed === true ? <span>✅</span> : "未完了"}
            <p>{todo.text}</p>
            <span>期日:{todo.dueDate}</span>
            <span>
                重要度:
                {
                    (()=>{
                        switch (todo.priority) {
                            case "low":
                                return "低";
                            case "medium":
                                return "中";
                            case "high":
                                return "高";
                            default:
                                return "";
                        }
                    })()
                }
            </span>
            <div>
                <button onClick={() => handleComplete(todo.id)}>完了</button>
                <button onClick={() => handleDelete(todo.id)}>削除</button>
            </div>
            <ReactDatePicker isChangeDueDate={true} onDateChange={(date) => handleDateChange(todo.id, date)}  />
            <button onClick={() => handleIsEditFormVisible(todo.id,true)}>編集</button>

            {todo.isEditFormVisible && <EditTodoForm todo={todo} />}
        </li>
    );
}

export default TodoItem;
