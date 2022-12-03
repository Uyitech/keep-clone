import React from 'react'
import Form from './Form';
import NoteBox from './NoteBox';
import EmptyNotes from './EmptyNote';
import { Box, styled } from '@mui/material';


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

function Main() {
    // const [notes, setNotes] = useState([]);

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <Form />
            <EmptyNotes />
        </Box>
    )
}

export default Main;