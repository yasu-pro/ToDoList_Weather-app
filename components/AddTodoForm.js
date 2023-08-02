
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { addTodo, deleteTodo } from "../redux/todosReducer";
import ReactDatePicker from "./DatePicker";
import {format} from "date-fns"

const AddTodoForm = () => {
    const [inputValue, setInputValue ] = useState('');
    const [result, setResult] = useState('');
    const [dueDate, setDueDate] = useState(new Date());
    const dispatch = useDispatch();

    const createId = () => {
        return Math.random().toString(36).substring(2, 9)
    }

    const handleClick = () => {
        setResult(inputValue);
        setDueDate(dueDate);
        dispatch(
            addTodo(
                {
                    text: inputValue,
                    completed: false,
                    id: createId(),
                    dueDate:format(dueDate, "yyyy年MM月dd日"),
                }
            )
        )
    }

    const handleChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleDatePickerChange = (date) => {
        setDueDate(date);
    }

    return (
        <div>
            <input type="text" onChange={handleChange} />
            <ReactDatePicker onDateChange={handleDatePickerChange} />
            <button onClick={handleClick}>追加</button>

            <p>input: {inputValue}</p>
            <p>Result: input:{result}</p>
        </div>
    )
}

export default AddTodoForm;
