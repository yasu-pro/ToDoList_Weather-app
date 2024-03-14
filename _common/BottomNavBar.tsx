"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudSun, faTableList, faGear } from "@fortawesome/free-solid-svg-icons";
import Styles from "./styles/modules/bottomNavBar.module.scss";

const BottomNavBar: React.FC = () => {
    const [isMobileScreen, setIsMobileScreen] = useState(false);

    useEffect(() => {
        // クライアントサイドでのみ実行
        if (typeof window !== "undefined") {
            setIsMobileScreen(window.innerWidth <= 768);
        }
    }, []);

    if (isMobileScreen) {
        return (
            <div className={Styles.bottomNavBar}>
                <Link href={`/weather`} passHref>
                    <FontAwesomeIcon className={Styles.customIcon} icon={faCloudSun} />
                    <span>Weather</span>
                </Link>
                <Link href="/" passHref>
                    <FontAwesomeIcon className={Styles.customIcon} icon={faTableList} />
                    <span>TodoList</span>
                </Link>
                <Link href="/settings" passHref>
                    <FontAwesomeIcon className={Styles.customIcon} icon={faGear} />
                    <span>Setting</span>
                </Link>
            </div>
        );
    }

    // PC 非表示
    return null;
};

export default BottomNavBar;
