
import React, { useState } from "react";
import ReactDatePicker from "./DatePicker";
import { format } from "date-fns"
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
                タイトル:
                <input type="text" value={editedTodo.text} onChange={(e) => setEditedTodo({ ...editedTodo, text: e.target.value })}/>
            </p>
            <p>進捗度</p>
            <div>
                優先度:
                <select value={editedTodo.priority} onChange={(e) => setEditedTodo({...editedTodo, priority: e.target.value})}>
                    <option value="low">低</option>
                    <option value="medium">中</option>
                    <option value="high">高</option>
                </select>
            </div>
            <p>
                期日:
                <ReactDatePicker isChangeDueDate={true} onDateChange={(date) => setEditedTodo({...editedTodo, dueDate: format(date, "yyyy年MM月dd日")})}  />
            </p>

            <div>
                <button onClick={handleEditComplete}>修正完了</button>
                <button onClick={handleEditCancel}>キャンセル</button>
            </div>
        </section>
    )
}

export default EditTodoForm;
