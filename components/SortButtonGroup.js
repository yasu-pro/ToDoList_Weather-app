import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeSort } from "../redux/todosReducer";
import styles from "../styles/customButton.module.css";

const SortButtonGroup = () => {
    const dispatch = useDispatch();

    const [sortOptions, setSortOptions] = useState({ sortBy: "addOrder", sortOrder: "asc" });


    const handleSortChange = (newSortOptions) => {
        dispatch(changeSort(newSortOptions));
    };

    const handleSortOptionChange = (event) => {
        const { name, value } = event.target;

        // Assign to a variable so that the value before the click is not entered.
        const newSortOptions = { ...sortOptions, [name]: value };
        setSortOptions(newSortOptions);

        handleSortChange(newSortOptions);
    }

    return (
        <div className='flex items-center'>
            <span className='flex items-center w-full'>
                <select
                    className={`${styles.cusotmSortButton} w-1/2 pt-2 pr-2 pb-2 pl-4`}
                    name="sortOrder"
                    defaultValue={sortOptions.sortOrder}
                    onChange={handleSortOptionChange}>
                    <option value="asc">昇順</option>
                    <option value="dsc">降順</option>
                </select>

                <select
                    className={`${styles.cusotmSortButton} w-1/2 pt-2 pr-3 pb-2 pl-4`}
                    name="sortBy"
                    defaultValue={sortOptions.sortBy}
                    onChange={handleSortOptionChange}>
                    <option value="addOrder">追加順</option>
                    <option value="dueDate">期日順</option>
                    <option value="priority">優先度順</option>
                </select>
            </span>
        </div>
    )
}

export default SortButtonGroup;
