import Todo from "../types/Todo";
import TodoOptionData from "../types/TodoOptionData";
import { parse } from "date-fns";

interface SortOptionsProps {
    ListData: Record<string, Todo>;
    OptionData: TodoOptionData;
}

const SortOptions = ({ ListData, OptionData }: SortOptionsProps): Todo[] => {
    const listData: Todo[] = ListData ? Object.values(ListData) : [];

    return listData.slice().sort((a, b) => {
        if (OptionData.sortBy === "dueDate") {
            return OptionData.sortOrder === "asc" ? parse(a.dueDate, "yyyy年MM月dd日", new Date()).getTime() - parse(b.dueDate, "yyyy年MM月dd日", new Date()).getTime() : parse(b.dueDate, "yyyy年MM月dd日", new Date()).getTime() - parse(a.dueDate, "yyyy年MM月dd日", new Date()).getTime();
        } else if (OptionData.sortBy === "priority") {
            return OptionData.sortOrder === "asc" ? a.priority - b.priority : b.priority - a.priority;
        } else {
            return OptionData.sortOrder === "asc" ? a.addOrder - b.addOrder : b.addOrder - a.addOrder;
        }
    });
};

export default SortOptions;
