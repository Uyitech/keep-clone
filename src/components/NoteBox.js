import React, { useEffect, useState, useRef } from 'react';
import { db } from '../firebase/firebase';
import Bricks from 'bricks.js'
// import Masonry from 'react-masonry-css'
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
// import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import { Card, CardContent, CardActions, CardMedia, Typography, Box } from '@mui/material';
import { doc, collection, orderBy, query, deleteDoc, onSnapshot } from "firebase/firestore";
import { ArchiveOutlined as Archive, DeleteOutlineOutlined as Delete, NoteAdd } from '@mui/icons-material';
import { display } from '@mui/system';


const StyledCard = styled(Card)(({ theme }) => ({
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
    }),
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

const StyledButton = styled(IconButton)(({ theme }) => ({
    padding: 6,
    color: `${theme.palette.custom.iconColor}`,
    opacity: `${theme.palette.custom.iconOpacity}`,
}));

// const TimeStamp = styled(Typography)(({ theme }) => ({
//     fontWeight: 400,
//     fontSize: '.875rem',
//     wordBreak: 'break-word',
//     textAlign: 'right',
//     padding: '4px 16px 0px 16px',
// }))


const NoteBox = () => {
    const theme = useTheme();
    const [note, setNote] = useState([])
    const [file, setFile] = useState([])

    const fileRef = useRef(null);

    const fileUpload = () => {
        fileRef.current.click();
    };

    const handleFileChange = (event) => {
        setFile(URL.createObjectURL(event.target.files[0]));
    }

    const fetchPost = () => {
        const collRef = (query(collection(db, "notes"), orderBy("time", "desc")));
        const unsub = onSnapshot(collRef, (querySnapshot) => {
            const newData = querySnapshot.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            });
            setNote(newData);
        })
        return unsub;
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
    }

    const sizes = [
        { columns: 2, gutter: 10 },
        { mq: '768px', columns: 3, gutter: 10 },
        { mq: '1024px', columns: 6, gutter: 15 }
    ]

    useEffect(() => {
        const instance = Bricks({
            container: '.container',
            packed: 'data-packed',
            sizes: sizes,
            position: false,
        })
        instance.pack()
        instance.update()
        instance.resize(true)
    })

    return (
        <Box className='container'>
            {note?.map((notes) => {
                return (
                    <StyledCard key={notes.id} className="card-box">
                        <CardContent sx={{ p: 0 }}>
                            <Box sx={{ display: 'flex', width: '100px' }}>
                                {/* <Box> */}
                                <CardMedia image={notes.image} component="img" alt={notes.image} />
                                {/* </Box> */}

                                <CardMedia image={file} component="img" alt={file} />
                            </Box>
                            <Title>{notes.title}</Title>
                            <Content>{notes.content}</Content>
                            {/* <TimeStamp sx={{fontSize: 10}}>Created at: {notes.time.toDate().toDateString()}</TimeStamp> */}
                        </CardContent>
                        <CardActions className="card-action">

                            <Tooltip title="" arrow followCursor>
                                <StyledButton sx={{ cursor: 'no-drop', opacity: 0.4 }}>
                                    <AddAlertOutlinedIcon sx={{ fontSize: "18px" }} />
                                </StyledButton >
                            </Tooltip>

                            <Tooltip title="" arrow followCursor>
                                <StyledButton sx={{ cursor: 'no-drop', opacity: 0.4 }}>
                                    <PersonAddAlt1OutlinedIcon sx={{ fontSize: "18px" }} />
                                </StyledButton >
                            </Tooltip>

                            <Tooltip title="Background options" arrow followCursor>
                                <StyledButton>
                                    <PaletteOutlinedIcon sx={{ fontSize: "18px" }} />
                                </StyledButton >
                            </Tooltip>

                            <Tooltip title="Add image" arrow followCursor>
                                <StyledButton onClick={fileUpload}>
                                    <ImageOutlinedIcon sx={{ fontSize: "18px" }} />
                                    <input type="file"
                                        accept="image/*"
                                        ref={fileRef}
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                </StyledButton>
                            </Tooltip>

                            <Tooltip title="Archive" arrow followCursor>
                                <StyledButton>
                                    <Archive sx={{ fontSize: "18px" }} />
                                </StyledButton >
                            </Tooltip>

                            <Tooltip title="Delete" arrow followCursor>
                                <StyledButton onClick={() => deleteNote(notes.id)}>
                                    <Delete sx={{ fontSize: "18px" }} />
                                </StyledButton >
                            </Tooltip>

                        </CardActions>
                    </StyledCard>
                )
            })}
        </Box >
    )
}

export default NoteBox;