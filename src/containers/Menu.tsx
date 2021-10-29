import {Drawer, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import AppsIcon from '@mui/icons-material/Apps';
import {BugReport, FilterDrama} from "@mui/icons-material";
import React from "react";
import {Index} from "../views/Index";
import {SimpleController} from "../views/SimpleController";
import { NavLink as RouterLink } from 'react-router-dom';
import {DynamicComponent} from "../utils/DynamicComponent";
import {DynamicDataPage} from "../views/DynamicDataPage";

type PageItem = {
    title: string,
    path: string,
    component: React.FC,
    icon?: React.FC,
    exactPath?: boolean | false
}

const drawerWidth: number = 256

export const Pages: PageItem[] = [
    {title: "Index", path: "/", icon: AppsIcon, component: Index, exactPath: true},
    {title: "Simple controller", path: "/simple-controller", icon: BugReport, component: SimpleController},
    {title: "Dynamic Data", path: "/dynamic-data", icon: FilterDrama, component: DynamicDataPage},
]

const MenuDrawer = () => {
    return (
        <List>
            { Pages.map((item) => (
                <ListItemButton key={item.path} component={RouterLink} to={item.path}>
                    <ListItemIcon>
                        <DynamicComponent component={item.icon}/>
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                </ListItemButton>
            ))}
        </List>
    )
}

export const Menu: React.FC<{open: boolean, drawerCloseHandler: any}> = (props) => {
    return (
        <>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
                open={props.open}
            >
                <MenuDrawer />
            </Drawer>
        </>
    )
}