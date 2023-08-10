import React from "react";
import styles from './TodoItem.module.scss';
import { useDispatch } from 'react-redux';
import { deleteTodo, completeTodo, showEditForm} from "../redux/todosReducer";
import EditTodoForm from "./EditTodoForm"
import { parse } from "date-fns"

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

    const calculateDaysUntilDueDate =() => {
        const dueDate = parse(todo.dueDate, "yyyy年MM月dd日", new Date())
        const currentDate = new Date();
        const timeDifference = dueDate - currentDate;// ミリ秒単位の差分
        const daysUntilDue = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // 日数に変換して切り上げ
        return daysUntilDue;
    }

    return (
        <li key={todo.id} className={styles.li}>
            {todo.completed === true ? <span>✅</span> : "未完了"}
            <p>{todo.text}</p>
            <p>
                <span>期日:{todo.dueDate}</span>
                <div>期日まで<span style={{color: "red"}}>{calculateDaysUntilDueDate()}</span>日</div>
            </p>
            <span>
                優先度:
                {
                    (()=>{
                        switch (todo.priority) {
                            case "1":
                                return "低";
                            case "2":
                                return "中";
                            case "3":
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
