import { parse } from "date-fns"

const SortOptions = ({todos}) => {

    const sortedTodos = todos.slice().sort((a, b) => {
        if (a.sortBy === "dueDate") {
            console.log("期日順",a.sortOrder);
            return a.sortOrder === "asc" ? parse(a.dueDate, "yyyy年MM月dd日", new Date()) - parse(b.dueDate, "yyyy年MM月dd日", new Date()):parse(b.dueDate, "yyyy年MM月dd日", new Date()) - parse(a.dueDate, "yyyy年MM月dd日", new Date());
        } else if (a.sortBy === "priority") {
            console.log("優先度順",a.sortOrder);
            return a.sortOrder === "asc" ? a.priority - b.priority : b.priority - a.priority;
        } else {
            console.log("追加順",a.sortOrder);
            return a.sortOrder === "asc" ? a.addOrder - b.addOrder : b.addOrder - a.addOrder
        }
    });
console.log(sortedTodos);
    return sortedTodos;
}



export default SortOptions;
