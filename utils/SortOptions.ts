import Todo from '../types/Todo';
import TodoOptions from '../types/TodoOptions';
import { parse } from "date-fns"

interface SortOptionsProps {
    ListData: Record<string, Todo> | null;
    TodoOptions: TodoOptions;
}

function SortOptions({ ListData, TodoOptions }: SortOptionsProps): Todo[] {
    const listData: Todo[] = ListData ? Object.values(ListData) : [];

    return listData.slice().sort((a, b) => {
        if (TodoOptions.sortBy === "dueDate") {
            return TodoOptions.sortOrder === "asc" ?
                parse(a.dueDate, "yyyy年MM月dd日", new Date()).getTime() - parse(b.dueDate, "yyyy年MM月dd日", new Date()).getTime() :
                parse(b.dueDate, "yyyy年MM月dd日", new Date()).getTime() - parse(a.dueDate, "yyyy年MM月dd日", new Date()).getTime();
        } else if (TodoOptions.sortBy === "priority") {
            return TodoOptions.sortOrder === "asc" ? a.priority - b.priority : b.priority - a.priority;
        } else {
            return TodoOptions.sortOrder === "asc" ? a.addOrder - b.addOrder : b.addOrder - a.addOrder;
        }
    });
}

export default SortOptions;
