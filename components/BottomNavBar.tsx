import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun, faTableList, faGear } from '@fortawesome/free-solid-svg-icons';
import Styles from "../styles/modules/bottomNavBar.module.scss";

const BottomNavBar = () => {
    const [isMobileScreen, setIsMobileScreen] = useState(false);

    useEffect(() => {
        // クライアントサイドでのみ実行
        if (typeof window !== 'undefined') {
            setIsMobileScreen(window.innerWidth <= 768);
        }
    }, []);

    if (isMobileScreen) {
        return (
            <div className={Styles.bottomNavBar}>
                <a href="/weather">
                    <FontAwesomeIcon className={Styles.customIcon} icon={faCloudSun} />
                    <span>Weather</span>
                </a>
                <a href="./">
                    <FontAwesomeIcon className={Styles.customIcon} icon={faTableList} />
                    <span>TodoList</span>
                </a>
                <a href="/settings">
                    <FontAwesomeIcon className={Styles.customIcon} icon={faGear} />
                    <span>Setting</span>
                </a>
            </div>
        );
    }

    // PC 非表示
    return null;
};

export default BottomNavBar;
