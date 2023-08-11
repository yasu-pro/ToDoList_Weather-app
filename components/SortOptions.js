import { parse } from "date-fns"

const SortOptions = ({todos}) => {

    const sortedTodos = todos.slice().sort((a, b) => {
        if (a.sortBy === "dueDate") {
            return a.sortOrder === "asc" ? parse(a.dueDate, "yyyy年MM月dd日", new Date()) - parse(b.dueDate, "yyyy年MM月dd日", new Date()):parse(b.dueDate, "yyyy年MM月dd日", new Date()) - parse(a.dueDate, "yyyy年MM月dd日", new Date());
        } else if (a.sortBy === "priority") {
            return a.sortOrder === "asc" ? a.priority - b.priority : b.priority - a.priority;
        } else {
            return a.sortOrder === "asc" ? a.addOrder - b.addOrder : b.addOrder - a.addOrder
        }
    });
    return sortedTodos;
}



export default SortOptions;
