
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { addTodo } from "../redux/todosReducer";
import ReactDatePicker from "./DatePicker";
import {format} from "date-fns"

const AddTodoForm = () => {
    const [inputValue, setInputValue ] = useState('');
    const [dueDate, setDueDate] = useState(new Date());
    const [priority, setPriority] = useState("3");
    const dispatch = useDispatch();

    const createId = () => {
        return Math.random().toString(36).substring(2, 9)
    }

    const handleClick = () => {
        const id = createId();
        const now = Date.now();

        dispatch(
            addTodo(
                {
                    id:id,
                    isEditFormVisible: false,
                    text: inputValue,
                    completed: false,
                    dueDate:format(dueDate, "yyyy年MM月dd日"),
                    priority:priority,
                    sortBy: "addOrder",
                    addOrder: now,
                }
            )
        )
        setInputValue("");
        setDueDate(new Date());
        setPriority("3");
    }

    const handleClear = () => {
        setInputValue("");
        setDueDate(new Date());
        setPriority("3");
    }

    const handleChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleDatePickerChange = (date) => {
        setDueDate(date);
    }

    const handlePriorityChange = (event) => {
        setPriority(event.target.value)
    }

    return (
        <div style={{ border: "1px solid green" }}>
            <div>
                <span>内容:</span>
                <input type="text" onChange={handleChange} value={inputValue}/>
            </div>
            <div>
                <span>優先度:</span>
                <div>
                    <input
                        type="radio"
                        id="low"
                        name="priority"
                        value="3"
                        checked={priority === "3"}
                        onChange={handlePriorityChange}
                    />
                    <label htmlFor="low">低</label>

                    <input
                        type="radio"
                        id="medium"
                        name="priority"
                        value="2"
                        checked={priority === "2"}
                        onChange={handlePriorityChange}
                    />
                    <label htmlFor="medium">中</label>

                    <input
                        type="radio"
                        id="high"
                        name="priority"
                        value="1"
                        checked={priority === "1"}
                        onChange={handlePriorityChange}
                    />
                    <label htmlFor="high">高</label>
                </div>
            </div>
            <div>
                <span>期日:</span>
                <ReactDatePicker selected={dueDate} onDateChange={handleDatePickerChange} />
            </div>
            <button onClick={handleClick}>追加</button>
            <button onClick={handleClear}>クリア</button>
        </div>
    )
}

export default AddTodoForm;
