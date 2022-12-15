import React from 'react'
import { styled, useTheme } from '@mui/material/styles';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import { List, ListItem, ListItemIcon, ListItemButton } from '@mui/material';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate } from "react-router-dom";


const ListItemText = styled('span')(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: '500'
}));

const Item = styled(ListItem)(({ theme }) => ({
    padding: '0%',
}));

const ItemButton = styled(ListItemButton)(({ theme }) => ({
    borderRadius: '0% 50px 50px 0%',
    '&.Mui-selected': {
        background: `${theme.palette.drawer.light}`,
    },
    '&.Mui-selected:hover': {
        background: `${theme.palette.drawer.light}`,
    },
}));


const NavList = (open) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    // const handleListItemClick = (event, index) => {
    //     setSelectedIndex(index);
    // };

    const navigate = useNavigate();

    const Home = (e) => {
        navigate("/")
        e.preventDefault()
        setSelectedIndex(0);
    }

    const Archive = (e) => {
        e.preventDefault()
        navigate("/Archive")
    }

    const Trash = (e) => {
        e.preventDefault()
        navigate("/Trash")
        setSelectedIndex(2);
    }



    return (
        <List component="nav" className='list'>
            <ItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}
                selected={selectedIndex === 0} onClick={Home}
            >
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                    <LightbulbOutlinedIcon sx={{ color: 'text.default' }} />
                </ListItemIcon>
                <ListItemText sx={{ color: 'text.default', opacity: open ? 1 : 0 }}>Notes</ListItemText>
            </ItemButton>

            <ItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}
                selected={selectedIndex === 1} onClick={Archive}
            >
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                    <ArchiveOutlinedIcon sx={{ color: 'text.default' }} />
                </ListItemIcon>
                <ListItemText sx={{ color: 'text.default', opacity: open ? 1 : 0 }}>Notes</ListItemText>
            </ItemButton>

            <ItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}
                selected={selectedIndex === 2} onClick={Trash}
            >
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                    <DeleteOutlineOutlinedIcon sx={{ color: 'text.default' }} />
                </ListItemIcon>
                <ListItemText sx={{ color: 'text.default', opacity: open ? 1 : 0 }}>Trash</ListItemText>
            </ItemButton>
        </List>
    )
}

export default NavList;