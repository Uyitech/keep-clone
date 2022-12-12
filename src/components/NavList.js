import React from 'react'
import { styled, useTheme } from '@mui/material/styles';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import { List, ListItem, ListItemIcon, ListItemButton } from '@mui/material';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


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
    const theme = useTheme;
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <List component="nav" className='list'>
            <Item>
                <ItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}
                    selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, 0)}
                >
                    <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                        <LightbulbOutlinedIcon sx={{ color: 'text.default' }} />
                    </ListItemIcon>
                    <ListItemText sx={{ color: 'text.default', opacity: open ? 1 : 0 }}>Notes</ListItemText>
                </ItemButton>
            </Item>

            <Item>
                <ItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1)}
                >
                    <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                        <ArchiveOutlinedIcon sx={{ color: 'text.default' }} />
                    </ListItemIcon>
                    <ListItemText sx={{ color: 'text.default', opacity: open ? 1 : 0 }}>Notes</ListItemText>
                </ItemButton>
            </Item>

            <Item>
                <ItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}
                >
                    <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                        <DeleteOutlineOutlinedIcon sx={{ color: 'text.default' }} />
                    </ListItemIcon>
                    <ListItemText sx={{ color: 'text.default', opacity: open ? 1 : 0 }}>Trash</ListItemText>
                </ItemButton>
            </Item>
        </List>
    )
}

export default NavList;