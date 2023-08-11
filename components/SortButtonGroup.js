import { useDispatch } from 'react-redux';
import { changeSortBy, changeSortOrder } from "../redux/todosReducer";
import { useState } from 'react';

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
        <div>
            <span>
                <select defaultValue={sortOrder} onChange={handleSortOrderChange}>
                    <option value="asc">昇順</option>
                    <option value="dsc">降順</option>
                </select>

                <select onChange={handleChangeSortBy}>
                    <option value="addOrder">追加順</option>
                    <option value="dueDate">期日順</option>
                    <option value="priority">優先度順</option>
                </select>
            </span>
        </div>
    )
}

export default SortButtonGroup;
