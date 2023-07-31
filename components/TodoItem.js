import styles from './TodoItem.module.scss';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteTodo } from "../redux/todosReducer";

const TodoItem = () => {
    const todos = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(
            deleteTodo(id)
        )
    }

    return (
        <>
            {
                todos.map((todo) => {
                    return(
                        <li key={todo.id} className={styles.li}>
                            <span>✅</span>
                            <p>{todo.text}</p>
                            <div>
                                <button>完了</button>
                                <button onClick={()=>handleDelete(todo.id)}>削除</button>
                            </div>
                        </li>
                    )
                })
            }
        </>
    )
}

export default TodoItem;
