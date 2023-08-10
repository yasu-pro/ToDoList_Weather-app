
import React, { useState } from "react";
import ReactDatePicker from "./DatePicker";
import { format, parse } from "date-fns"
import { editTodoAction, showEditForm } from "../redux/todosReducer";
import { useDispatch } from 'react-redux';

const EditTodoForm = ({todo}) => {
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
        <section style={{ border: "1px solid black" }}>

            <p>
                <span>内容:</span>
                <input value={editedTodo.text} onChange={(e) => setEditedTodo({ ...editedTodo, text: e.target.value })}/>
            </p>
            <div>
                <span>優先度:</span>
                <div>
                    <input
                        type="radio"
                        id={`low-${editedTodo.id}`}
                        name={`editedPriority-${editedTodo.id}`}
                        value="3"
                        checked={editedTodo.priority === "3"}
                        onChange={(e) => setEditedTodo({...editedTodo, priority: e.target.value})}
                    />
                    <label htmlFor={`low-${editedTodo.id}`}>低</label>

                    <input
                        type="radio"
                        id={`medium-${editedTodo.id}`}
                        name={`editedPriority-${editedTodo.id}`}
                        value="2"
                        checked={editedTodo.priority === "2"}
                        onChange={(e) => setEditedTodo({...editedTodo, priority: e.target.value})}
                    />
                    <label htmlFor={`medium-${editedTodo.id}`}>中</label>

                    <input
                        type="radio"
                        id={`high-${editedTodo.id}`}
                        name={`editedPriority-${editedTodo.id}`}
                        value="1"
                        checked={editedTodo.priority === "1"}
                        onChange={(e) => setEditedTodo({...editedTodo, priority: e.target.value})}
                    />
                    <label htmlFor={`high-${editedTodo.id}`}>高</label>
                </div>
            </div>
            <p>
                <span>期限:</span>
                <ReactDatePicker id="editedDueDate"
                    selected={parse(editedTodo.dueDate, "yyyy年MM月dd日", new Date())}
                    onDateChange={(date) => setEditedTodo({...editedTodo, dueDate: format(date, "yyyy年MM月dd日")})}
                />
            </p>

            <div>
                <button onClick={handleEditComplete}>修正完了</button>
                <button onClick={handleEditCancel}>キャンセル</button>
            </div>
        </section>
    )
}

export default EditTodoForm;
