import React from "react";

const TodoSummary = ( {todos} ) => {
    console.log( todos );
    const totalTodo = todos.length > 0 ? todos.length : 0;
    const uncompleted = todos.length > 0 ? todos.filter(todo => todo.completed === false).length : 0;
    const completedTodo = todos.length > 0 ? todos.filter(todo => todo.completed === true).length : 0;
    const calculateCompletionRate = () => {
        if (totalTodo === 0) {
            return 0;
        }
        const completionRate = Math.floor((completedTodo / totalTodo) * 100);
        console.log(completionRate);
        return completionRate;
    }

    return(
        <table style={{ border: "1px solid blue" }}>
            <tbody>
                <tr>
                    <th>現在のタスク総数</th>
                    <td>{totalTodo} 個</td>
                </tr>
                <tr>
                    <th>残りのタスク</th>
                    <td>{uncompleted} 個</td>
                </tr>
                <tr>
                    <th>完了済のタスク</th>
                    <td>{completedTodo} 個</td>
                </tr>
                <tr>
                    <th>完遂率</th>
                    <td>{calculateCompletionRate()} %</td>
                </tr>
            </tbody>
        </table>
    )
}

export default TodoSummary;
