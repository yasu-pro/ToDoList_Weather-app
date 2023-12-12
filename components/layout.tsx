import React, { ReactNode } from "react";
import CustomHead from "./Head";
import BottomNavigationBar from "../components/BottomNavBar";
import BurgerMenu from "../components/BurgerMenu";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <CustomHead />
            <BurgerMenu />
            <main>
                <div className="pt-10 pb-3 pl-3 pr-3 md:pr-12 md:pt-20 md:pl-12 md:pb-12">{children}</div>
            </main>
            <BottomNavigationBar />
        </>
    );
};

export default Layout;
