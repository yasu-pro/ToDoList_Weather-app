import { useDispatch } from 'react-redux';
import { changeSortBy } from "../redux/todosReducer";

const SortButtonGroup = () => {
    const dispatch = useDispatch();

    const handleClick = (sortBy) => {
        dispatch(changeSortBy( sortBy ));
    }

    return (
        <div>
            <button onClick={() => handleClick("addOrder")}>追加順</button>
            <button onClick={() => handleClick("dueDate")}>期日順</button>
        </div>
    )
}

export default SortButtonGroup;
