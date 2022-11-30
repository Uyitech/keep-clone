import React from 'react'
import { styled } from "@mui/material";
import { ListItem, ListItemIcon, ListItemButton } from '@mui/material';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';

const ListItemText = styled('span')(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: '500'
}));


const NavList = (open) => {
    return (
        <ul className='list'>
            {['Notes'].map((text) => (
                <ListItem key={text} sx={{ padding: '0%', borderRadius: '0% 50px 50px 0%', bgcolor: 'drawer.light' }}>
                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }}>
                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                            <LightbulbOutlinedIcon sx={{ color: 'text.default' }} />
                        </ListItemIcon>
                        <ListItemText sx={{ color: 'text.default', opacity: open ? 1 : 0 }}>{text}</ListItemText>
                    </ListItemButton>
                </ListItem>
            ))
            }
        </ul >
    )
}

export default NavList;