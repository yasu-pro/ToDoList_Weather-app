interface Todo {
    id: string;
    isEditFormVisible: boolean;
    title: string;
    contents: string;
    completed: boolean;
    dueDate: string;
    priority: number;
    addOrder: number;
}

export default Todo;
