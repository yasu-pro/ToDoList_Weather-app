
const addTodoAction = (text) => {
    return {
        type: 'ADD_TODO',
        payload: {
            text: text,
            completed: false
        }
    }
}

const deleteTodoAction = (id) => {
    return {
        type:'DELETE_TODO',
        payload: {
            id:id
        }
    }
}

const completeTodoAction = (id) => {
    return {
        type:'COMPLETE_TODO',
        payload: {
            id:id,
            completed: true
        }
    }
}
