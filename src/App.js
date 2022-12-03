import React, { useState } from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { Box } from "@mui/material";
import { CssBaseline } from '@mui/material';
import HeaderBar from './components/AppBar';
import Divider from '@mui/material/Divider';
import Note from './components/Note';
import { styled } from "@mui/material";
import NavList from './components/NavList';
import { light } from './theme';
import { dark } from './theme';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Drawer = styled('div', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);


function App() {
    const [mode, setMode] = useState("dark")
    const [open, setOpen] = React.useState(true);

    const selectedTheme = mode === "dark" ? dark : light;

    const toogleMode = () => {
        setMode(mode === "light" ? "dark" : "light")
    }

    const handleDrawerOpen = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={selectedTheme}>
            <CssBaseline />
            <Box sx={{ display: 'flex' }}>
                <HeaderBar open={open} handleDrawerOpen={handleDrawerOpen} toogleMode={toogleMode} />
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader />
                    <NavList />
                    <Divider sx={{ borderBottomWidth: '2px' }} />
                </Drawer>
                <Note />
            </Box>
        </ThemeProvider>
    )
}

export default App;
