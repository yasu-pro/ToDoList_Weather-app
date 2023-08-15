import React from "react";
import customBoxStyles from '../styles/customBox.module.css';
import customSummaryStyles from '../styles/customSummary.module.css';

const TodoSummary = ( {todos} ) => {
    const totalTodo = todos.length > 0 ? todos.length : 0;
    const uncompleted = todos.length > 0 ? todos.filter(todo => todo.completed === false).length : 0;
    const completedTodo = todos.length > 0 ? todos.filter(todo => todo.completed === true).length : 0;
    const calculateCompletionRate = () => {
        if (totalTodo === 0) {
            return 0;
        }
        const completionRate = Math.floor((completedTodo / totalTodo) * 100);
        return completionRate;
    }

    return(
        <div className={`${customBoxStyles.customBox} pt-5 pr-5 pb-5 pl-5`}>
            <p className="text-lg font-semibold">タスクの状況</p>
            <div className="mt-3 border-t-2 border-rgb-243-244-246">
                <table className={customSummaryStyles.customTable}>
                    <tbody>
                        <tr className={customSummaryStyles.customTr}>
                            <th className={customSummaryStyles.customTh}>現在のタスク総数</th>
                            <td className={customSummaryStyles.customTd}>{totalTodo} 個</td>
                        </tr>
                        <tr className={customSummaryStyles.customTr}>
                            <th className={customSummaryStyles.customTh}>残りのタスク</th>
                            <td className={customSummaryStyles.customTd}>{uncompleted} 個</td>
                        </tr>
                        <tr className={customSummaryStyles.customTr}>
                            <th className={customSummaryStyles.customTh}>完了済のタスク</th>
                            <td className={customSummaryStyles.customTd}>{completedTodo} 個</td>
                        </tr>
                        <tr className={customSummaryStyles.customTr}>
                            <th className={customSummaryStyles.customTh}>完遂率</th>
                            <td className={customSummaryStyles.customTd}>{calculateCompletionRate()} %</td>
                        </tr>
                    </tbody>
                </table>
            </div>  
        </div>
    )
}

export default TodoSummary;
