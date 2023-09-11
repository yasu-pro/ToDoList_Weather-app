import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, createTheme, ThemeProvider } from "@mui/material";
import { clearAllTodos } from "../redux/todosReducer";

const ClearAllButton = () => {
    const dispatch = useDispatch();

    // カスタムテーマの定義
    const theme = createTheme({
        components: {
            MuiButton: {
                styleOverrides: {
                    outlinedPrimary: {
                        width: "100%",
                        color: "rgb(220 38 38 )",
                        backgroundColor: "rgb(254 226 226)",
                        borderColor: "rgb(239 68 68 )",
                        '&:hover': {
                            color: "rgb(254 226 226)",
                            backgroundColor: "rgb(239 68 68 )",
                            borderColor: "rgb(220 38 38 )",
                        }
                    },
                },
            },
        },
    });

    const handleClearAll = () => {
        if (window.confirm("タスクを全て削除します。一度削除すると元に戻せません。")) {
            dispatch(clearAllTodos());
        }
    }

    return (
        <div className="mt-5">
            <ThemeProvider theme={theme}>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleClearAll}
                    sx={{ marginRight: "0.5rem" }}
                    data-testid="clear-all-button"
                >全削除
                </Button>
            </ThemeProvider>
        </div>
    )
}

export default ClearAllButton;
