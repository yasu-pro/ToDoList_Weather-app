import { useDispatch } from 'react-redux';
import { changeSortBy, changeSortOrder } from "../redux/todosReducer";
import { useState } from 'react';

const SortButtonGroup = () => {
    const dispatch = useDispatch();
    const [sortOrder, setSortOrder] = useState("asc")

    const handleClick = (sortBy) => {
        dispatch(changeSortBy( sortBy ));
    }

    const handleSortOrderChange = (event) => {
        const targetSortOrder = event.target.value
        // console.log("hoge", targetSortOrder );
        dispatch(changeSortOrder( targetSortOrder ))
        setSortOrder( targetSortOrder )
    }

    return (
        <div>
            <button onClick={() => handleClick("addOrder")}>追加順</button>
            <button onClick={() => handleClick("dueDate")}>期日順</button>
            <button onClick={() => handleClick("priority")}>優先度順</button>

            <select defaultValue={sortOrder} onChange={handleSortOrderChange}>
                <option value="asc">昇順</option>
                <option value="dsc">降順</option>
            </select>
        </div>
    )
}

export default SortButtonGroup;
