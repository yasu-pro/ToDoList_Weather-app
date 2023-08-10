import { parse } from "date-fns"

const SortOptions = ({todos}) => {
    const sortedTodos = todos.slice().sort((a, b) => {
        if (a.sortBy === "dueDate") {
            return parse(a.dueDate, "yyyy年MM月dd日", new Date()) - parse(b.dueDate, "yyyy年MM月dd日", new Date());
        } else if (a.sortBy === "priority") {
            return a.priority - b.priority;
        } else {
            return a.addOrder - b.addOrder;
        }
    });

    return sortedTodos;
}

export default SortOptions;
