"use client";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function TodoListLayout({ children }: { children: ReactNode }) {
    return (
        <Provider store={store}>
            <React.StrictMode>{children}</React.StrictMode>
        </Provider>
    );
}
