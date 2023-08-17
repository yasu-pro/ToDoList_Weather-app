
import { useState } from "react";
import { useDispatch } from 'react-redux';
import {format} from "date-fns"
import { Button } from "@mui/material";
import { addTodo } from "../redux/todosReducer";
import ReactDatePicker from "./DatePicker";
import customBoxStyles from "../styles/customBox.module.css";
import customButtonStyles from "../styles/customButton.module.css";
import customRadioButtonStyles from '../styles/customRadioButton.module.css';

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
                    addOrder: now,
                    sortBy: "addOrder",
                    sortOrder: "asc"
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
        <section className={customBoxStyles.customBox}>
            <div className="pt-5 pr-5 pb-5 pl-5">
                <p className="text-lg font-semibold">新規タスク</p>

                <div className="pr-3 pl-3">
                    <div className="pt-3">
                        <p>内容 : </p>
                        <input className="w-full pt-1.5 pb-1.5 pr-4 pl-4 text-lg mt-1.5 bg-gray-100" type="text" onChange={handleChange} value={inputValue}/>
                    </div>

                    <div className="pt-3">
                        <p>優先度 : </p>
                        <div className="pt-1 w-36 flex items-center justify-between">
                            <div>
                                <label className="ml-1" htmlFor="low">
                                    <input
                                    type="radio"
                                    id="low"
                                    name="priority"
                                    value="3"
                                    checked={priority === "3"}
                                    onChange={handlePriorityChange}
                                    className={customRadioButtonStyles.customPriorityRadioButton}
                                    />
                                    <span className={`${customRadioButtonStyles.customRadioButtonIcon} ${priority === "3" ? customRadioButtonStyles.lowIcon : ""}`}></span>
                                    低
                                </label>
                            </div>

                            <div>
                                <label className="ml-1" htmlFor="medium">
                                    <input
                                    type="radio"
                                    id="medium"
                                    name="priority"
                                    value="2"
                                    checked={priority === "2"}
                                    onChange={handlePriorityChange}
                                    className={customRadioButtonStyles.customPriorityRadioButton}
                                    />
                                    <span className={`${customRadioButtonStyles.customRadioButtonIcon} ${priority === "2" ? customRadioButtonStyles.mediumIcon : ""}`}></span>
                                    中
                                </label>
                            </div>

                            <div>
                                <label className="ml-1" htmlFor="high">
                                    <input
                                    type="radio"
                                    id="high"
                                    name="priority"
                                    value="1"
                                    checked={priority === "1"}
                                    onChange={handlePriorityChange}
                                    className={customRadioButtonStyles.customPriorityRadioButton}
                                    />
                                    <span className={`${customRadioButtonStyles.customRadioButtonIcon} ${priority === "1" ? customRadioButtonStyles.hightIcon : ""}`}></span>
                                    高
                                </label>
                            </div>
                        </div>
                        <div className="pt-3">
                            <p>期日 : </p>
                            <ReactDatePicker selected={dueDate} onDateChange={handleDatePickerChange} />
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="pt-5 pr-5 pb-5 pl-5 flex justify-end border-t border-solid customGray bg-gray-100">
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleClear}
                    sx={{ marginRight: "0.5rem" }}
                    className={customButtonStyles.customFormButton}
                >
                    クリア
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                    className={`${customButtonStyles.customFormButton} ${customButtonStyles.customFormClearButton}`}
                >
                    追加
                </Button>
            </div>
        </section>
    )
}

export default AddTodoForm;
