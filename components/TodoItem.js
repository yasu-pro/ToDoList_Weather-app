import styles from './TodoItem.module.scss';
import { useDispatch } from 'react-redux';
import { format } from "date-fns"
import { deleteTodo, completeTodo, changeDueDate} from "../redux/todosReducer";
import ReactDatePicker from "./DatePicker";

const TodoItem = ({ todo }) => {
    console.log(todo);
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
        </li>
    );
}

export default TodoItem;
