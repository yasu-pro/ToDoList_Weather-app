
import styles  from "./TodoList.module.scss";
const TodoList = ({children}) => {
    return (
        <ul className={styles.list}>{children}</ul>
    )
}

export default TodoList;
