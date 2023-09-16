import Todo from "./Todo";
import TodoOptionData from './TodoOptionData';

interface AllTodoDataProps {
    allTodoData: {
        ListData: Record<string, Todo>;
        OptionData: TodoOptionData;
    }
}
export default AllTodoDataProps;
