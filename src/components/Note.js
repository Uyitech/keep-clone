import React from 'react'
import Form from './Form';
import NoteBox from './NoteBox';
import EmptyNotes from './Pages/EmptyNote';
import { Box, styled, Container } from '@mui/material';


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

function Main(props) {

    // let note = props.notes
    // const cars = props.cars;

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <Form />

            {props.note?.length > 0 ?
                <Container maxWidth={false}>
                    <Box mt={8}>
                        <NoteBox />
                    </Box>
                </Container>
                :
                <Container maxWidth={false}>
                    <Box mt={8}>
                        <NoteBox />
                    </Box>
                </Container>
            }

        </Box>
    )
}
// const cars = ['Ford', 'BMW', 'Audi'];
export default Main;