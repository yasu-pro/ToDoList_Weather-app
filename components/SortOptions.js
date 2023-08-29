import { parse } from "date-fns"

const SortOptions = ({ allTodoData }) => {

    const listData = allTodoData.ListData ? Object.values(allTodoData.ListData) : [];

    const sortedListData = listData.slice().sort((a, b) => {
        if (allTodoData.optionData.sortBy === "dueDate") {
            return allTodoData.optionData.sortOrder === "asc" ? parse(a.dueDate, "yyyy年MM月dd日", new Date()) - parse(b.dueDate, "yyyy年MM月dd日", new Date()):parse(b.dueDate, "yyyy年MM月dd日", new Date()) - parse(a.dueDate, "yyyy年MM月dd日", new Date());
        } else if (allTodoData.optionData.sortBy === "priority") {
            return allTodoData.optionData.sortOrder === "asc" ? a.priority - b.priority : b.priority - a.priority;
        } else {
            return allTodoData.optionData.sortOrder === "asc" ? a.addOrder - b.addOrder : b.addOrder - a.addOrder;
        }
    });
    return sortedListData;
}

export default SortOptions;
