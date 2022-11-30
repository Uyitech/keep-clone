import React from 'react'
import { styled, Box } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import NavList from './NavList';
import HeaderBar from './AppBar';
import Note from './Note';

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

export default function Navbar() {
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex' }} component="div">
            <CssBaseline />
            <HeaderBar open={open} handleDrawerOpen={handleDrawerOpen} />
            <Drawer variant="permanent" open={open}>
                <DrawerHeader />
                <NavList />
            </Drawer>
            <Note />
        </Box>
    );
}