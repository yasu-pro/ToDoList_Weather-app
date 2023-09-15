import Todo from "./Todo";
import TodoOptionData from './TodoOptionData';

interface AllTodoDataProps {
    allTodoData: {
        ListData: Record<string, Todo> | null;
        OptionData: TodoOptionData;
    }
}
export default AllTodoDataProps;
