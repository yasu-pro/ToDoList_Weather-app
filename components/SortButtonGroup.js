import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeSortBy, changeSortOrder } from "../redux/todosReducer";
import styles from "../styles/customButton.module.css";

const SortButtonGroup = () => {
    const dispatch = useDispatch();
    const [sortOrder, setSortOrder] = useState("asc")

    const handleChangeSortBy = (event) => {
        const sortBy = event.target.value;
        dispatch(changeSortBy( sortBy ));
    }

    const handleSortOrderChange = (event) => {
        const targetSortOrder = event.target.value
        dispatch(changeSortOrder( targetSortOrder ))
        setSortOrder( targetSortOrder )
    }

    return (
        <div className='flex items-center'>
            <span className='flex items-center'>
                <select className={`${styles.cusotmSortButton} pt-2 pr-2 pb-2 pl-4`} defaultValue={sortOrder} onChange={handleSortOrderChange}>
                    <option value="asc">昇順</option>
                    <option value="dsc">降順</option>
                </select>

                <select className={`${styles.cusotmSortButton} pt-2 pr-3 pb-2 pl-4`} onChange={handleChangeSortBy}>
                    <option value="addOrder">追加順</option>
                    <option value="dueDate">期日順</option>
                    <option value="priority">優先度順</option>
                </select>
            </span>
        </div>
    )
}

export default SortButtonGroup;
