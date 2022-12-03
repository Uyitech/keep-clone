import React from 'react'
import { LightbulbOutlined as Lightbulb } from '@mui/icons-material';
import { Typography, Box, styled } from '@mui/material';


const Light = styled(Lightbulb)(({ theme }) => ({
    margin: '20px',
    fontSize: '120px',
    color: `${theme.palette.icon.light}`,
}));

const Text = styled(Typography)(({ theme }) => ({
    fontSize: '22px',
    color: `#80868b`,
}));

const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    marginTop: '20vh',
    alignItems: 'center',
    flexDirection: 'column',
}));

const EmptyNotes = () => {
    return (
        <Container>
            <Light />
            <Text>Notes you add appear here</Text>
        </Container>
    )
}

export default EmptyNotes;