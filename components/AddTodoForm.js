
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { addTodo, deleteTodo } from "../redux/todosReducer";

const AddTodoForm = () => {
    const [inputValue, setInputValue ] = useState('');
    const [result, setResult] = useState('');
    const dispatch = useDispatch();

    const handleClick = () => {
        setResult(inputValue);
        dispatch(
            addTodo(
                {
                    text: inputValue,
                    completed: false,
                }
            )
        )
    }

    const handleChange = (event) => {
        console.log(event.target.value);
        setInputValue(event.target.value);
    }

    return (
        <div>
            <input onChange={handleChange} type="text" />
            <button onClick={handleClick}>追加</button>

            <p>input: {inputValue}</p>
            <p>Result: {result}</p>
        </div>
    )
}

export default AddTodoForm;
