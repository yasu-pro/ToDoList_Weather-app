import { parse } from "date-fns"

const SortOptions = ({ ListData, optionData }) => {
    const listData = ListData ? Object.values(ListData) : [];

    return listData.slice().sort((a, b) => {
        if (optionData.sortBy === "dueDate") {
            return optionData.sortOrder === "asc" ? parse(a.dueDate, "yyyy年MM月dd日", new Date()) - parse(b.dueDate, "yyyy年MM月dd日", new Date()):parse(b.dueDate, "yyyy年MM月dd日", new Date()) - parse(a.dueDate, "yyyy年MM月dd日", new Date());
        } else if (optionData.sortBy === "priority") {
            return optionData.sortOrder === "asc" ? a.priority - b.priority : b.priority - a.priority;
        } else {
            return optionData.sortOrder === "asc" ? a.addOrder - b.addOrder : b.addOrder - a.addOrder;
        }
    });
}

export default SortOptions;
