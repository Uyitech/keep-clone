import React, { useState } from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Main from './components/Main';
import HeaderBar from './components/AppBar';
import { light } from './theme';
import { dark } from './theme';

function App() {
    const [mode, setMode] = useState("dark")
    const selectedTheme = mode === "dark" ? dark : light;

    const toogleMode = () => {
        setMode(mode === "light" ? "dark" : "light")
    }

    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={selectedTheme}>
            <CssBaseline />
            {/* <HeaderBar  */}
            <HeaderBar open={open} handleDrawerOpen={handleDrawerOpen} toogleMode={toogleMode} />
            <Main />
        </ThemeProvider>
    )
}

export default App;
