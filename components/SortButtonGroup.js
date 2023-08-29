import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeSort } from "../redux/todosReducer";
import styles from "../styles/customButton.module.css";

const SortButtonGroup = () => {
    const dispatch = useDispatch();
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortBy, setSortBy] = useState("addOrder");


    const handleSortChange = (sortByValue, sortOrderValue) => {
        dispatch(changeSort({ sortBy: sortByValue, sortOrder: sortOrderValue }));
    };

    const handleSortOrderChange = (event) => {
        const targetSortOrder = event.target.value;
        setSortOrder(targetSortOrder);
        handleSortChange(sortBy, targetSortOrder);
    };

    const handleChangeSortBy = (event) => {
        const newSortBy = event.target.value;
        setSortBy(newSortBy);
        handleSortChange(newSortBy, sortOrder);
    };

    return (
        <div className='flex items-center'>
            <span className='flex items-center w-full'>
                <select className={`${styles.cusotmSortButton} w-1/2 pt-2 pr-2 pb-2 pl-4`} defaultValue={sortOrder} onChange={handleSortOrderChange}>
                    <option value="asc">昇順</option>
                    <option value="dsc">降順</option>
                </select>

                <select className={`${styles.cusotmSortButton} w-1/2 pt-2 pr-3 pb-2 pl-4`} defaultValue={sortBy} onChange={handleChangeSortBy}>
                    <option value="addOrder">追加順</option>
                    <option value="dueDate">期日順</option>
                    <option value="priority">優先度順</option>
                </select>
            </span>
        </div>
    )
}

export default SortButtonGroup;
