"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { slide as Menu } from "react-burger-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const BurgerMenu = () => {
    const [isPcScreen, setIsPcScreen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const styles = {
        bmBurgerButton: {
            position: "fixed",
            width: "36px",
            height: "30px",
            left: "36px",
            top: "36px",
        },
        bmBurgerBars: {
            background: "#373a47",
        },
        bmBurgerBarsHover: {
            background: "#a90000",
        },
        bmCrossButton: {
            height: "24px",
            width: "24px",
        },
        bmCross: {
            background: "#bdc3c7",
        },
        bmMenuWrap: {
            position: "fixed",
            height: "100%",
        },
        bmMenu: {
            background: "#373a47",
            padding: "2.5em 1.5em 0",
            fontSize: "1.15em",
        },
        bmMorphShape: {
            fill: "#373a47",
        },
        bmItemList: {
            color: "#b8b7ad",
            padding: "0.8em",
        },
        bmItem: {
            display: "block",
        },
        bmOverlay: {
            background: "rgba(0, 0, 0, 0.3)",
        },
    };

    useEffect(() => {
        // クライアントサイドでのみ実行
        if (typeof window !== "undefined") {
            setIsPcScreen(window.innerWidth > 768);
        }
    }, []);

    const handleStateChange = (state) => {
        setMenuOpen(state.isOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return isPcScreen ? (
        <Menu isOpen={menuOpen} onStateChange={handleStateChange} width={250} customBurgerIcon={<FontAwesomeIcon icon={faBars} />} customCrossIcon={<FontAwesomeIcon icon={faTimes} />} styles={styles}>
            <Link href="/todolist" onClick={closeMenu}>
                ToDoList
            </Link>
            <Link href="/weather" onClick={closeMenu}>
                Weather
            </Link>
            <Link href="/settings" onClick={closeMenu}>
                Settings
            </Link>
        </Menu>
    ) : null;
};

export default BurgerMenu;
