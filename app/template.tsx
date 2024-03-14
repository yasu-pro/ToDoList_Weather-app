import React, { ReactNode } from "react";
import BottomNavigationBar from "../_common/BottomNavBar";
import BurgerMenu from "../_common/BurgerMenu";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <>
            <BurgerMenu />
            <div className="pt-10 pb-3 pl-3 pr-3 mb-20 md:pr-12 md:pt-20 md:pl-12 md:pb-12 md:mb-0">{children}</div>
            <BottomNavigationBar />
        </>
    );
}
