
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { addTodo } from "../redux/todosReducer";
import ReactDatePicker from "./DatePicker";
import {format} from "date-fns"

const AddTodoForm = () => {
    const [inputValue, setInputValue ] = useState('');
    const [dueDate, setDueDate] = useState(new Date());
    const [priority, setPriority] = useState('low');
    const dispatch = useDispatch();

    const createId = () => {
        return Math.random().toString(36).substring(2, 9)
    }

    const handleClick = () => {
        const id = createId();
        dispatch(
            addTodo(
                {
                    id:id,
                    text: inputValue,
                    completed: false,
                    dueDate:format(dueDate, "yyyy年MM月dd日"),
                    priority:priority,
                }
            )
        )
        setInputValue("");
        setDueDate(new Date());
        setPriority("low");
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
        <div>
            <input type="text" onChange={handleChange} value={inputValue}/>
            <div>
                優先度：
                <select value={priority} onChange={handlePriorityChange}>
                    <option value="low">低</option>
                    <option value="medium">中</option>
                    <option value="high">高</option>
                </select>
            </div>
            <ReactDatePicker onDateChange={handleDatePickerChange} />
            <button onClick={handleClick}>追加</button>
        </div>
    )
}

export default AddTodoForm;
