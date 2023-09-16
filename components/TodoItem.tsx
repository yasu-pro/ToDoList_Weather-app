import React from "react";
import { useDispatch } from 'react-redux';
import Todo from "../types/Todo";
import { parse } from "date-fns"
import { Popover } from '@headlessui/react';
import { deleteTodo, completeTodo, showEditForm} from "../redux/todosReducer";
import ModalEditTodoForm from "./ModalEditTodoForm"
import customButtonStyles from "../styles/customButton.module.css";
import customPopoverStyles from "../styles/customPopover.module.css";

const TodoItem: React.FC<{ todo : Todo }> = ({ todo }) => {
    const dispatch = useDispatch();

    const handleDelete = (id: string) => {
        dispatch(deleteTodo(id))
    }

    const handleComplete = (id: string) => {
        const isComplete = !todo.completed;
        dispatch(completeTodo({id, isComplete}))
    }

    const handleIsEditFormVisible = (id: string, isShow: boolean) => {
        dispatch(showEditForm( {id, isEditFormVisible: isShow }))
    }

    const calculateDaysUntilDueDate = (): string | number => {
        const dueDate = parse(todo.dueDate, "yyyy年MM月dd日", new Date()).getTime();
        const currentDate = new Date().getTime();
        const timeDifference = dueDate - currentDate; // ミリ秒単位の差分
        const daysUntilDue = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // 日数に変換して切り上げ

        if (daysUntilDue < 0) {
            return 'expired';
        } else if (daysUntilDue <= 30) {
            return `${daysUntilDue}日`;
        } else {
            // 日数を30で割って簡易的な月数に変換
            const monthsUntilDue = Math.floor(daysUntilDue / 30);
            return `${monthsUntilDue}ヶ月`;
        }
    }

    return (
        <li key={todo.id} className="flex items-center justify-between pt-3 pb-3 pl-3 pr-3 transition duration-300 ease-in-out even:bg-gray-100 md:even:bg-transparent md:hover:bg-gray-100">

            <div>
                <div className="flex flex-wrap items-center gap-x-3">
                    <span>
                        {
                            (()=>{
                                switch (todo.priority) {
                                    case 3:
                                        return <svg className="block w-1 h-1 align-middle fill-green-500" viewBox="0 0 6 6" aria-hidden="true"><circle cx="3" cy="3" r="3"></circle></svg>;
                                    case 2:
                                        return <svg className="block w-1 h-1 align-middle fill-yellow-300" viewBox="0 0 6 6" aria-hidden="true"><circle cx="3" cy="3" r="3"></circle></svg>;;
                                    case 1:
                                        return <svg className="block w-1 h-1 align-middle fill-red-500" viewBox="0 0 6 6" aria-hidden="true"><circle cx="3" cy="3" r="3"></circle></svg>;;
                                    default:
                                        return "";
                                }
                            })()
                        }
                    </span>

                    <p className="w-40 overflow-hidden text-sm font-semibold leading-6 truncate">{todo.text}</p>

                    <div className="flex">
                        <p className={`w-24 text-center text-xs pt-1 pr-3 pb-1 pl-3 rounded-md border border-opacity-20 ${todo.completed !== true ? "bg-red-100 border-red-500" :"bg-green-100 border-green-500"}`}>
                            <span className={`${todo.completed !== true ? "text-red-600" : "text-green-600"} leading-4 font-normal`}>
                                {todo.completed !== true ? "InComplete" : "Complete"}
                            </span>
                        </p>

                        <div className="ml-3">
                            <p className="text-xs">
                                {calculateDaysUntilDueDate() === 'expired' ? (
                                    <span className="text-lg text-red-600">期限が過ぎています</span>
                                ) : (
                                    <>
                                        期日まで
                                        <span className="ml-1 text-lg text-red-600">{calculateDaysUntilDueDate()}</span>
                                    </>
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center mt-2">
                    <p className="text-xs font-semibold leading-6 text-gray-500 dark:text-gray-300">期日:{todo.dueDate}</p>
                </div>
            </div>

            <div className="flex items-center">

                <Popover className={`relative ${customPopoverStyles.popoverWrap}`}>
                    <Popover.Button className={customPopoverStyles.popoverButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="nz sb">
                            <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z">
                            </path>
                        </svg>
                    </Popover.Button>
                    <Popover.Panel className={`absolute z-10 ${customPopoverStyles.popoverPanel}`} >
                        <div className="p-2 space-y-2 bg-white rounded-lg shadow-md">
                            <Popover.Button className={customPopoverStyles.commonButton}
                                onClick={() =>{
                                    handleComplete(todo.id);
                                    }}>
                                {todo.completed !== true ? '完了' : '未完了'}
                            </Popover.Button>
                            <Popover.Button className={customPopoverStyles.commonButton}
                                onClick={() =>{
                                    handleIsEditFormVisible(todo.id, true);
                                    }}>
                                編集
                            </Popover.Button>
                            <Popover.Button className={customPopoverStyles.commonButton}
                                onClick={() =>{
                                    handleDelete(todo.id);
                                    }}>
                                削除
                            </Popover.Button>
                        </div>
                    </Popover.Panel>
                </Popover>

                <span className={`${customButtonStyles.commonButtonWrap} bg-opacity-5 rounded-md inline-flex`}>
                    <button className={customButtonStyles.commonButton} onClick={()=>handleComplete(todo.id)} >
                        {todo.completed !== true ? "完了":"未完了" }
                    </button>
                    <button className={customButtonStyles.commonButton} onClick={() => handleIsEditFormVisible(todo.id,true)}>編集</button>
                    <button className={customButtonStyles.commonButton} onClick={() => handleDelete(todo.id)}>削除</button>
                </span>
            </div>

            {todo.isEditFormVisible && <ModalEditTodoForm todo={todo} />}
        </li>
    );
}

export default TodoItem;
