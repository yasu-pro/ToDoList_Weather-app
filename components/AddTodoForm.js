import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import {format} from "date-fns"
import { Button } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';
import { addTodo } from "../redux/todosReducer";
import ReactDatePicker from "./DatePicker";
import customBoxStyles from "../styles/customBox.module.css";
import customButtonStyles from "../styles/customButton.module.css";
import customRadioButtonStyles from '../styles/customRadioButton.module.css';

const AddTodoForm = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue ] = useState('');
    const [dueDate, setDueDate] = useState(new Date());
    const [priority, setPriority] = useState("3");

    const createId = () => {
        return uuidv4();
    }

    const handleClick = () => {
        const id = createId();
        const now = Date.now();

        dispatch(
            addTodo(
                {
                    id: String(id),
                    isEditFormVisible: false,
                    text: inputValue,
                    completed: false,
                    dueDate: format(dueDate, "yyyy年MM月dd日"),
                    priority: priority,
                    addOrder: now
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

    const isFormValid = inputValue !== "";

    return (
        <section className={`${customBoxStyles.customBox} flex flex-col justify-between order-2 md:order-1`}>
            <div className="pt-4 pb-4 pl-3 pr-3 md:pt-5 md:pr-5 md:pb-5 md:pl-5">
                <p className="text-lg font-semibold">新規タスク</p>

                <div className="pl-2 pr-2 md:pr-3 md:pl-3">
                    <div className="pt-3">
                        <p className="flex">
                            内容
                            <span className="pt-1 pb-1 pl-1 pr-1 ml-1 mr-1 text-xs text-red-600 border border-red-500 rounded-sm">
                            必須
                            </span>
                            :
                        </p>
                        <input className={`w-full pt-1.5 pb-1.5 pr-4 pl-4 text-lg mt-1.5 ${inputValue === "" ? "bg-red-100" : "bg-gray-100"}`} type="text" onChange={handleChange} value={inputValue}/>
                        {inputValue === "" && <span className="text-red-600">文字を入力してください</span>}
                    </div>

                    <div className="pt-3">
                        <p>優先度 : </p>
                        <div className="flex items-center justify-between pt-1 w-36">
                            <div>
                                <label className="flex items-center ml-1" htmlFor="low">
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
                                <label className="flex items-center ml-1" htmlFor="medium">
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
                                <label className="flex items-center ml-1" htmlFor="high">
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
            <div className="flex justify-end pt-3 pb-3 pl-3 pr-3 bg-gray-100 border-t border-solid md:pt-5 md:pr-5 md:pb-5 md:pl-5 customGray">
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
                    disabled={!isFormValid}
                    className={`${customButtonStyles.customFormButton} ${customButtonStyles.customFormClearButton}`}
                >
                    追加
                </Button>
            </div>
        </section>
    )
}

export default AddTodoForm;
