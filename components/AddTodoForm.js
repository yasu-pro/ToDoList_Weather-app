
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
                    isEditFormVisible: false,
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
                        value="low"
                        checked={priority === "low"}
                        onChange={handlePriorityChange}
                    />
                    <label htmlFor="low">低</label>

                    <input
                        type="radio"
                        id="medium"
                        name="priority"
                        value="medium"
                        checked={priority === "medium"}
                        onChange={handlePriorityChange}
                    />
                    <label htmlFor="medium">中</label>

                    <input
                        type="radio"
                        id="high"
                        name="priority"
                        value="high"
                        checked={priority === "high"}
                        onChange={handlePriorityChange}
                    />
                    <label htmlFor="high">高</label>
                </div>
            </div>
            <div>
                <span>期日:</span>
                <ReactDatePicker onDateChange={handleDatePickerChange} />
            </div>
            <button onClick={handleClick}>追加</button>
        </div>
    )
}

export default AddTodoForm;
