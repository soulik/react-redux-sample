import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import React from "react";
import {Menu} from "./Menu";

export const AppContainer: React.FC = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{display: 'flex'}}>
            <AppBar position={'fixed'}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Blah
                    </Typography>
                </Toolbar>
            </AppBar>
            <Menu open={open} drawerCloseHandler={handleDrawerClose}/>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                { props.children }
            </Box>
        </Box>
    )
}