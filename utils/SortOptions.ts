import Todo from '../types/Todo';
import TodoOptions from '../types/TodoOptions';
import { parse } from "date-fns"

interface SortOptionsProps {
    ListData: Record<string, Todo> | null;
    optionData: TodoOptions;
}

const SortOptions = ({ ListData, optionData }: SortOptionsProps): Todo[] => {
    const listData: Todo[] = ListData ? Object.values(ListData) : [];

    return listData.slice().sort((a, b) => {
        if (optionData.sortBy === "dueDate") {
            return optionData.sortOrder === "asc" ?
                parse(a.dueDate, "yyyy年MM月dd日", new Date()).getTime() - parse(b.dueDate, "yyyy年MM月dd日", new Date()).getTime() :
                parse(b.dueDate, "yyyy年MM月dd日", new Date()).getTime() - parse(a.dueDate, "yyyy年MM月dd日", new Date()).getTime();
        } else if (optionData.sortBy === "priority") {
            return optionData.sortOrder === "asc" ? a.priority - b.priority : b.priority - a.priority;
        } else {
            return optionData.sortOrder === "asc" ? a.addOrder - b.addOrder : b.addOrder - a.addOrder;
        }
    });
}

export default SortOptions;
