
import React, { useState } from "react";
import { format, parse } from "date-fns"
import { useDispatch } from 'react-redux';
import { Button } from "@mui/material";
import Modal from "react-modal";
import ReactDatePicker from "./DatePicker";
import { editTodoAction, showEditForm } from "../redux/todosReducer";
import customButtonStyles from "../styles/customButton.module.css";
import customRadioButtonStyles from '../styles/customRadioButton.module.css';

const EditTodoForm = ({todo}) => {

    const customStyles = {
        content: {
            top: "35%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            overflow: "visible",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "900px",
            minWidth: "40%",
            width: "90%",
            padding: "0",
            borderRadius: "0.375rem",
            border:"1px solid rgba(0, 0, 0, 0.12)",
            boxShadow: "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
        },
    };

    const [editedTodo, setEditedTodo] = useState(todo);
    const dispatch = useDispatch();

    const handleEditComplete = () => {
        const updatedTodo = { ...editedTodo, isEditFormVisible: false };
        setEditedTodo(updatedTodo);
        dispatch(editTodoAction(updatedTodo));
    }

    const handleEditCancel = () => {
        dispatch(showEditForm({ id: todo.id, isEditFormVisible: false }));
    }

    return (
        <Modal isOpen={editedTodo.isEditFormVisible} style={customStyles}>
            <div className="pt-5 pr-5 pb-5 pl-5">
                <p className="text-lg font-semibold">編集</p>

                <div className="pr-3 pl-3">
                    <div className="pt-3">
                        <p className="flex">
                            内容
                            <span className="mr-1 ml-1 pt-1 pr-1 pb-1 pl-1 text-xs text-red-600 border border-red-500 rounded-sm">
                            必須
                            </span>
                            :
                        </p>
                        <input className={`w-full pt-1.5 pb-1.5 pr-4 pl-4 text-lg mt-1.5 bg-gray-100 ${editedTodo.text === "" ? "bg-red-100" : "bg-gray-100"}`} value={editedTodo.text} onChange={(e) => setEditedTodo({ ...editedTodo, text: e.target.value })}/>
                        {editedTodo.text === "" && <span className="text-red-600">文字を入力してください</span>}
                    </div>

                    <div className="pt-3">
                        <p>優先度 : </p>
                        <div className="pt-1 w-36 flex items-center justify-between">
                            <div>
                                <label className="ml-1" htmlFor={`low-${editedTodo.id}`}>
                                    <input
                                        type="radio"
                                        id={`low-${editedTodo.id}`}
                                        name={`editedPriority-${editedTodo.id}`}
                                        value="3"
                                        checked={editedTodo.priority === "3"}
                                        onChange={(e) => setEditedTodo({...editedTodo, priority: e.target.value})}
                                        className={customRadioButtonStyles.customPriorityRadioButton}
                                    />
                                    <span className={`${customRadioButtonStyles.customRadioButtonIcon} ${editedTodo.priority === "3" ? customRadioButtonStyles.lowIcon : ""}`}></span>
                                    低
                                </label>
                            </div>

                            <div>
                                <label className="ml-1" htmlFor={`medium-${editedTodo.id}`}>
                                    <input
                                        type="radio"
                                        id={`medium-${editedTodo.id}`}
                                        name={`editedPriority-${editedTodo.id}`}
                                        value="2"
                                        checked={editedTodo.priority === "2"}
                                        onChange={(e) => setEditedTodo({...editedTodo, priority: e.target.value})}
                                        className={customRadioButtonStyles.customPriorityRadioButton}
                                    />
                                    <span className={`${customRadioButtonStyles.customRadioButtonIcon} ${editedTodo.priority === "2" ? customRadioButtonStyles.mediumIcon : ""}`}></span>
                                    中
                                </label>
                            </div>

                            <div>
                                <label className="ml-1" htmlFor={`high-${editedTodo.id}`}>
                                    <input
                                        type="radio"
                                        id={`high-${editedTodo.id}`}
                                        name={`editedPriority-${editedTodo.id}`}
                                        value="1"
                                        checked={editedTodo.priority === "1"}
                                        onChange={(e) => setEditedTodo({...editedTodo, priority: e.target.value})}
                                        className={customRadioButtonStyles.customPriorityRadioButton}
                                    />
                                    <span className={`${customRadioButtonStyles.customRadioButtonIcon} ${editedTodo.priority === "1" ? customRadioButtonStyles.hightIcon : ""}`}></span>
                                    高
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="pt-3">
                        <p>期限 : </p>
                        <ReactDatePicker id="editedDueDate"
                            selected={parse(editedTodo.dueDate, "yyyy年MM月dd日", new Date())}
                            onDateChange={(date) => setEditedTodo({...editedTodo, dueDate: format(date, "yyyy年MM月dd日")})}
                        />
                    </div>
                </div>
            </div>

            <div className="pt-5 pr-5 pb-5 pl-5 flex justify-end border-t border-solid bg-gray-100 overflow-hidden rounded-tl-md rounded-tr-md rounded-bl-lg rounded-br-lg">
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleEditCancel}
                    sx={{ marginRight: "0.5rem" }}
                    className={customButtonStyles.customFormButton}
                >
                    キャンセル
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEditComplete}
                    disabled={editedTodo.text === ""}
                    className={`${customButtonStyles.customFormButton} ${customButtonStyles.customFormClearButton}`}
                >
                    修正完了
                </Button>
            </div>
        </Modal>
    )
}

export default EditTodoForm;
