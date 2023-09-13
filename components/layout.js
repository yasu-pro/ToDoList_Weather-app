import React from "react";
import CustomHead from "./Head"

const Layout = ({children}) => {
    return (
        <div>
            <CustomHead />
            <main>{children}</main>
        </div>
    );
}
export default Layout;
