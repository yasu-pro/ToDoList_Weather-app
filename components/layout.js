import React from "react";
import CustomHead from "./Head"


const siteTitle = 'ToDoリスト';

const Layout = ({children}) => {
    return (
        <div>
            <CustomHead />
            <main>{children}</main>
        </div>
    );
}
export default Layout;
