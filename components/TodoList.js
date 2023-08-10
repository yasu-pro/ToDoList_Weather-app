
import styles  from "./TodoList.module.scss";
import TodoItem from "./TodoItem";
import SortOptions from "./SortOptions";

const TodoList = ({ todos }) => {

    const sortedTodos = SortOptions({todos})

    return (
        <ul className={styles.list}>
            {sortedTodos.length > 0 ? (
                sortedTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
            ) : (
                <p>Todoを追加してください。</p>
            )}
        </ul>
    )
}

export default TodoList;
