import React from 'react';
import { useDispatch } from 'react-redux';
import { clearAllTodos } from "../redux/todosReducer";

const ClearAllButton = () => {
    const dispatch = useDispatch();

    const handleClearAll = () => {
        if (window.confirm("タスクを全て削除します。一度削除すると元に戻せません。")) {
            dispatch(clearAllTodos());
        }
    }

    return (
        <button onClick={handleClearAll}>全削除</button>
    )
}

export default ClearAllButton;
