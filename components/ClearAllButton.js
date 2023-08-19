import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from "@mui/material";
import { clearAllTodos } from "../redux/todosReducer";
import customButtonStyles from "../styles/customButton.module.css";

const ClearAllButton = () => {
    const dispatch = useDispatch();

    const handleClearAll = () => {
        if (window.confirm("タスクを全て削除します。一度削除すると元に戻せません。")) {
            dispatch(clearAllTodos());
        }
    }

    return (
        <Button
            variant="outlined"
            color="primary"
            onClick={handleClearAll}
            sx={{ marginRight: "0.5rem" }}
            className={customButtonStyles.customClearAllButton}
        >全削除
        </Button>
    )
}

export default ClearAllButton;
