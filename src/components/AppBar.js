import React, { useState } from 'react'
import {
    styled,
    InputBase,
    AppBar,
    Toolbar,
    IconButton,
    Box,
    Typography
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ViewAgendaOutlined from '@mui/icons-material/ViewAgendaOutlined';
import Brightness4OutlinedIcon from '@mui/icons-material/Brightness4Outlined';
import Brightness5OutlinedIcon from '@mui/icons-material/Brightness5Outlined';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: `${theme.palette.searchBar.light}`,
    '&:hover': {
        backgroundColor: `${theme.palette.searchBar.light}`,
    },
    marginLeft: 20,
    width: '100%',
    [theme.breakpoints.up('lg')]: {
        width: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
        flexGrow: 0,
        display: 'none',
        width: theme.spacing(90),
        marginLeft: theme.spacing(9)
    },

}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        marginRight: '20px',
        width: '100%',
        height: '35px',
        [theme.breakpoints.up('lg')]: {
            width: '40rem',
        },
    },
}));


export default function HeaderBar({ open, handleDrawerOpen, toogleMode }) {
    const theme = useTheme();
    const [search, setSearch] = useState("")
    const [searchBar, setSearchBar] = React.useState(true)

    const toogleSearchBar = () => {
        setSearchBar(prevState => !prevState)
    }

    return (
        <AppBar position="fixed" open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: `${theme.palette.background.default}`, boxShadow: 'inset 0 -0.5px 0 0 #dadce0' }}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    sx={{ color: 'text.default' }}
                >
                    <MenuIcon />
                </IconButton>

                <LogoContainer />
                {searchBar && (
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon sx={{ color: 'text.default' }} />
                        </SearchIconWrapper>
                        <StyledInputBase
                            value={search}
                            placeholder="Search.."
                            onChange={(e) => setSearch(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton sx={{ visibility: search ? "visible" : "hidden" }}
                                        onClick={() => setSearch("")}>
                                        <ClearIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                            sx={{ color: 'text.default' }} />
                    </Search>
                )}

                <Box sx={{ flexGrow: 1 }} />

                <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
                    <IconButton size="large" onClick={toogleSearchBar} sx={{ color: 'text.default', display: { sm: 'flex', md: 'none' } }}>
                        <SearchIcon className='searchBarIcon' />
                    </IconButton>
                    <IconButton size="large" sx={{ color: 'text.default' }} onClick={toogleMode}>
                        {theme.palette.mode === 'dark' ? <Brightness5OutlinedIcon /> : <Brightness4OutlinedIcon />}
                    </IconButton>
                    <IconButton size="large" sx={{ color: 'text.default' }}>
                        <ViewAgendaOutlined />
                    </IconButton>
                    <IconButton size="large" edge="end" sx={{ color: 'text.default' }}>
                        <AccountCircle />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar >
    )
}

function LogoContainer() {
    return (
        <Box sx={{ display: 'flex', pr: { md: '53px', xs: '5px' }, alignItems: 'center' }}>
            <img className="logo" src={`../img/keep-logo.png`} alt={"logo"} />
            <Typography
                noWrap
                className="navTitle"
                sx={
                    {
                        color: 'text.default',
                        fontSize: '20px',
                        pt: '5px',
                        pl: '5px'
                    }
                }
            >
                Keep
            </Typography>
        </Box>
    );
}