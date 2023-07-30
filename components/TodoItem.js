import styles from './TodoItem.module.scss';
import { useSelector } from 'react-redux';

const TodoItem = () => {
    const todos = useSelector((state) => state.todos);

    return (
        <>
            {
                todos.map((todo) => {
                    return(
                        <li key={todo.text} className={styles.li}>
                            <span>✅</span>
                            <p>{todo.text}</p>
                            <div>
                                <button>完了</button>
                                <button>削除</button>
                            </div>
                        </li>
                    )
                })
            }
        </>
    )
}

export default TodoItem;
