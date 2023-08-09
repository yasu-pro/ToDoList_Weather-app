import React from "react";
import styles from './TodoItem.module.scss';
import { useDispatch } from 'react-redux';
import { deleteTodo, completeTodo, showEditForm} from "../redux/todosReducer";
import EditTodoForm from "./EditTodoForm"

const TodoItem = ({ todo }) => {
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteTodo(id))
    }

    const handleComplete = (id) => {
        const isComplete = todo.completed ? false : true;
        dispatch(completeTodo({id, isComplete}))
    }

    const handleIsEditFormVisible = (id, isShow) => {
        dispatch(showEditForm( {id, isEditFormVisible: isShow }))
    }

    return (
        <li key={todo.id} className={styles.li}>
            {todo.completed === true ? <span>✅</span> : "未完了"}
            <p>{todo.text}</p>
            <span>期日:{todo.dueDate}</span>
            <span>
                優先度:
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
                <span>完了:</span>
                <input type="checkbox" checked={todo.completed} onChange={() => handleComplete(todo.id)} />
            </div>

            <button onClick={() => handleDelete(todo.id)}>削除</button>
            <button onClick={() => handleIsEditFormVisible(todo.id,true)}>編集</button>

            {todo.isEditFormVisible && <EditTodoForm todo={todo} />}
        </li>
    );
}

export default TodoItem;
