import React from 'react';
import './styles/App.scss';
import {AppRouter} from "./AppRouter";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

function App() {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <AppRouter/>
        </ThemeProvider>
    );
}

export default App;
