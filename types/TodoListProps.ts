import Todo from "./Todo";
import TodoOptions from './TodoOptions';

interface TodoListProps {
    allTodoData: {
        ListData: Record<string, Todo> | null;
        TodoOptions: TodoOptions;
    }
}
export default TodoListProps;
