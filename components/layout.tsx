import React, { ReactNode } from "react";
import CustomHead from "./Head";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <CustomHead />
            <div>
                <main>{children}</main>
            </div>
        </>
    );
};

export default Layout;
