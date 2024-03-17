"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudSun, faTableList, faGear, faUser } from "@fortawesome/free-solid-svg-icons";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";

export default function TemporaryDrawer() {
    const [isPcScreen, setIsPcScreen] = useState(false);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        // クライアントサイドでのみ実行
        if (typeof window !== "undefined") {
            setIsPcScreen(window.innerWidth > 768);
        }
    }, []);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {["todolist", "weather"].map((text, index) => (
                    <Link href={`/${text}`}>
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>{index % 2 === 0 ? <FontAwesomeIcon icon={faCloudSun} /> : <FontAwesomeIcon icon={faTableList} />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <List>
                {["setting", "user"].map((text, index) => (
                    <Link href={`/${text}`}>
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>{index % 2 === 0 ? <FontAwesomeIcon icon={faGear} /> : <FontAwesomeIcon icon={faUser} />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Box>
    );

    return isPcScreen ? (
        <div>
            <IconButton color="inherit" aria-label="open drawer" onClick={toggleDrawer(true)} edge="start" sx={{ mt: 2, ml: 2, position: "fixed", top: "16px", left: "16px", width: "50px", height: "50px", zIndex: "9999", ...(open && { display: "none" }) }}>
                <MenuIcon />
            </IconButton>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    ) : null;
}
