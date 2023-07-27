
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { addTodoAction } from '../redux/actions';

const AddTodoForm = () => {
    const [inputValue, setInputValue ] = useState('');
    const [result, setResult] = useState('');

    const addTodoForm = () => {
        setResult(inputValue);
        useDispatch(addTodoAction(inputValue))
    }

    const handleChange = (event) => {
        console.log(event.target.value);
        setInputValue(event.target.value);
    }

    return (
        <div>
            <input onChange={handleChange} type="text" />
            <button onClick={addTodoForm}>追加</button>

            <p>input: {inputValue}</p>
            <p>Result: {result}</p>
        </div>
    )
}

export default AddTodoForm;
