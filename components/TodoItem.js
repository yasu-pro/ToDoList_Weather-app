import styles from './TodoItem.module.scss';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { format } from "date-fns"
import { deleteTodo } from "../redux/todosReducer";
import { completeTodo } from "../redux/todosReducer";
import { changeDueDate } from "../redux/todosReducer";
import ReactDatePicker from "./DatePicker";

const TodoItem = () => {
    const todos = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(
            deleteTodo(id)
        )
    }

    const handleComplete = (id) => {
        dispatch(
            completeTodo(id)
        )
    }

    const handleDateChange = (id, date) => {
        const formattedDate = format(date, "yyyy年MM月dd日");
        dispatch(changeDueDate({ id, dueDate: formattedDate }));
    };

    return (
        <>
            {
                todos.map((todo) => {
                    return(
                        <li key={todo.id} className={styles.li}>
                            {todo.completed === true ? <span>✅</span> : ''}
                            <p>{todo.text}</p>
                            <div>
                                <button onClick={()=>handleComplete(todo.id)}>完了</button>
                                <button onClick={()=>handleDelete(todo.id)}>削除</button>
                            </div>
                            <span>期日:{todo.dueDate}</span>
                            <ReactDatePicker isChangeDueDate={true} onDateChange={(date) => handleDateChange(todo.id, date)}  />
                        </li>
                    )
                })
            }
        </>
    )
}

export default TodoItem;
