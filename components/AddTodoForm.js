
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { addTodo, deleteTodo } from "../redux/todosReducer";

const AddTodoForm = () => {
    const [inputValue, setInputValue ] = useState('');
    const [result, setResult] = useState('');
    const [dueDate, setDueDate] = useState('');
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
                    dueDate:dueDate,
                }
            )
        )
    }

    const handleChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleDueDayChange = (e) => {
        setDueDate(e.target.value);
        console.log(setDueDate);
    }

    return (
        <div>
            <input type="text" onChange={handleChange} />
            <input type="date" onChange={(e) => handleDueDayChange(e)} />
            <button onClick={handleClick}>追加</button>

            <p>input dueDay: {}</p>
            <p>input: {inputValue}</p>
            <p>Result: input:{result}/dueDate:{dueDate}</p>
        </div>
    )
}

export default AddTodoForm;
