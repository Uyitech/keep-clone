import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { Card, CardContent, CardActions, CardMedia, Typography } from '@mui/material';
import { doc, collection, getDocs, orderBy, query, deleteDoc, onSnapshot } from "firebase/firestore";
import { ArchiveOutlined as Archive, DeleteOutlineOutlined as Delete } from '@mui/icons-material';


const StyledCard = styled(Card)(({ theme }) => ({
    margin: '8px',
    width: '240px',
    display: "flex",
    background: 'none',
    borderRadius: '6px',
    borderStyle: "solid",
    height: 'fit-content',
    flexDirection: "column",
    borderWidth: theme.spacing(0.1),
    borderColor: `${theme.palette.border.default}`,
    transition: theme.transitions.create("all", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.standard
    })
}))

const Title = styled(Typography)(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: 500,
    minHeight: '38px',
    paddingTop: '12px',
    lineHeight: '1.5rem',
    wordBreak: 'break-word',
    letterSpacing: '.00625em',
    padding: '16px 16px 0 16px'
}))

const Content = styled(Typography)(({ theme }) => ({
    fontWeight: 400,
    fontSize: '.875rem',
    wordBreak: 'break-word',
    padding: '4px 16px 12px 16px',
}))

const NoteBox = () => {
    const theme = useTheme();
    const [note, setNote] = useState([])

    const fetchPost = () => {
        const collRef = collection(db, "notes");
        const unSubs = onSnapshot(collRef, (querySnapshot) => {
            const newData = querySnapshot.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            });
            setNote(newData);
        })
        return unSubs;
    }

    useEffect(() => {
        fetchPost();
    }, [])

    const deleteNote = (notes) => {
        deleteDoc(doc(db, "notes", notes))
            .then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        // console.log(note)
        // console.log(doc(db, "notes", notes))
    }


    return (
        <Grid container spacing={{ xs: 2, md: 3 }} variant="masonry" columns={{ xs: 4, sm: 8, md: 12 }}>
            {note?.map((notes) => {
                return (
                    <StyledCard key={notes.id}>
                        <CardContent sx={{ p: 0 }}>
                            <CardMedia image={notes.image} component="img" alt={notes.image} />
                            <Title>{notes.title}</Title>
                            <Content>{notes.content}</Content>
                            {/* <Typography>{notes.time}</Typography> */}
                        </CardContent>
                        <CardActions>
                            <IconButton>
                                <Archive fontSize="small" style={{ marginLeft: 'auto' }} />
                            </IconButton>
                            <IconButton onClick={() => deleteNote(notes.id)}>
                                <Delete fontSize="small" />
                            </IconButton>
                        </CardActions>
                    </StyledCard>
                )
            })}
        </Grid>
    )
}

export default NoteBox;