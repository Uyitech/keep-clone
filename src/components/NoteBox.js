import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import Bricks from 'bricks.js'
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import CloseIcon from '@mui/icons-material/Close';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { styled, useTheme, Stack, TextField } from '@mui/material';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import { Tooltip, Dialog, Button, Snackbar, IconButton } from '@mui/material';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import { Card, CardContent, CardActions, CardMedia, Typography, Box } from '@mui/material';
import { ArchiveOutlined as Archive, DeleteOutlineOutlined as Delete } from '@mui/icons-material';
import { doc, collection, orderBy, query, deleteDoc, onSnapshot, updateDoc } from "firebase/firestore";

import { useParams } from 'react-router-dom'



const StyledCard = styled(Card)(({ theme }) => ({
    width: '240px',
    display: "flex",
    boxShadow: 'none',
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
    fontWeight: 400,
    minHeight: '38px',
    fontSize: '1.1rem',
    paddingTop: '12px',
    lineHeight: '1.5rem',
    wordBreak: 'break-word',
    letterSpacing: '.00625em',
    padding: '16px 16px 4px 16px',
}))

const Content = styled(Typography)(({ theme }) => ({
    fontWeight: 400,
    overflow: 'hidden',
    fontSize: '.875rem',
    whiteSpace: 'normal',
    display: '-webkit-box',
    wordBreak: 'break-word',
    margin: '5px 16px',
}))

const StyledButton = styled(IconButton)(({ theme }) => ({
    padding: 6,
    color: `${theme.palette.custom.iconColor}`,
    opacity: `${theme.palette.custom.iconOpacity}`,
}));

const NoteButton = styled(Button)(({ theme }) => ({
    padding: '4px 15px',
    textTransform: 'capitalize',
    color: `${theme.palette.text.default}`,
    '&:hover': {
        background: `${theme.palette.searchBar.light}`
    }
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        width: '600px',
        borderRadius: '8px',
        overflowX: 'hidden',
        borderStyle: "solid",
        borderColor: '#5f6368',
        borderWidth: theme.spacing(0.1),
        background: `${theme.palette.background.default}`,
    }
}));

const StyledTitle = styled(TextField)(({ theme }) => ({
    padding: '10px 16px',
    '& .MuiInputBase-root': {
        padding: 0,
        letterSpacing: 0,
        fontWeight: '400',
        fontSize: '1.450rem',
        lineHeight: '1.75rem',
        color: `${theme.palette.custom.dialogText}`,
    }
}))

const StyledContent = styled(TextField)(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: '400',
    letterSpacing: '.00625em',
    padding: '0px 16px 16px 16px',
    color: `${theme.palette.custom.dialogText}`,
}))

// const TimeStamp = styled(Typography)(({ theme }) => ({
//     fontWeight: 400,
//     fontSize: '.875rem',
//     wordBreak: 'break-word',
//     textAlign: 'right',
//     padding: '4px 16px 0px 16px',
// }))


export default function NoteBox() {
    const [notes, setNotes] = useState([])
    const [open, setOpen] = React.useState(false);
    const [snackBar, setSnackBar] = useState(false)
    const [currentNote, setCurrentNote] = useState([])


    const handleClickOpen = (openedNote) => {
        setOpen(true);
        setCurrentNote(openedNote);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const fetchPost = () => {
        const collRef = (query(collection(db, "notes"), orderBy("time", "desc")));
        const unsub = onSnapshot(collRef, (querySnapshot) => {
            const newData = querySnapshot.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            });
            setNotes(newData);
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
                // console.log(notes)
                setSnackBar(true)
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
    }

    const closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackBar(false);
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={closeSnackbar}>
                UNDO
            </Button>
            <Tooltip title="Dismiss" arrow followCursor>
                <IconButton
                    size="small"
                    color="inherit"
                    aria-label="close"
                    onClick={closeSnackbar}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        </React.Fragment >
    );

    useEffect(() => {
        const bricks = Bricks({
            container: '.container',
            packed: 'data-packed',
            sizes: [
                { columns: 2, gutter: 10 },
                { mq: '768px', columns: 3, gutter: 10 },
                { mq: '1024px', columns: 6, gutter: 15 }
            ],
            position: false,
        })
        bricks.pack()
        bricks.update()
        bricks.resize(true)
    })

    return (
        <>
            <Box className='container'>
                {notes?.map((note) => {
                    // console.log(note.id)
                    return (
                        <StyledCard key={note.id} className="card-box">
                            <CardContent sx={{ p: 0 }} onClick={() => handleClickOpen(note)}>
                                <CardMedia image={note.image} component="img" alt={note.image} />
                                <Title>{note.title}</Title>
                                <Content className='content'>{note.content}</Content>
                                {/* <TimeStamp sx={{ fontSize: 10 }}>Created at: {note.time.toDate().toDateString()}</TimeStamp> */}
                            </CardContent>
                            <CardActions className="card-action">

                                <Tooltip title="Remind me" arrow followCursor>
                                    <StyledButton sx={{ cursor: 'not-allowed', opacity: 0.4 }}>
                                        <AddAlertOutlinedIcon sx={{ fontSize: "18px" }} />
                                    </StyledButton >
                                </Tooltip>

                                <Tooltip title="Collaborator" arrow followCursor>
                                    <StyledButton sx={{ cursor: 'not-allowed', opacity: 0.4 }}>
                                        <PersonAddAlt1OutlinedIcon sx={{ fontSize: "18px" }} />
                                    </StyledButton >
                                </Tooltip>

                                <Tooltip title="Background options" arrow followCursor>
                                    <StyledButton>
                                        <PaletteOutlinedIcon sx={{ fontSize: "18px" }} />
                                    </StyledButton >
                                </Tooltip>

                                <Tooltip title="Add image" arrow followCursor>
                                    <StyledButton sx={{ cursor: 'not-allowed', opacity: 0.4 }}>
                                        <ImageOutlinedIcon sx={{ fontSize: "18px" }} />
                                        <input type="file"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                        />
                                    </StyledButton>
                                </Tooltip>

                                <Tooltip title="Archive" arrow followCursor>
                                    <StyledButton>
                                        <Archive sx={{ fontSize: "18px" }} />
                                    </StyledButton >
                                </Tooltip>

                                <Tooltip title="Delete" arrow followCursor>
                                    <StyledButton onClick={() => deleteNote(note.id)}>
                                        <Delete sx={{ fontSize: "18px" }} />
                                    </StyledButton >
                                </Tooltip>

                            </CardActions>
                        </StyledCard>
                    )
                })}
            </Box>
            <EditNote
                open={open}
                data={currentNote}
                onClose={handleClose}
            />
            <Snackbar
                action={action}
                open={snackBar}
                message="Note Trash"
                onClose={closeSnackbar}
                autoHideDuration={6000}
            />
        </>
    )
}


function EditNote(props) {
    const theme = useTheme();
    const { id } = useParams()
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    console.log(props.data.id)

    const update = async () => {

        try {
            const updateMe = doc(db, "notes", props.data.id)
            await updateDoc(updateMe, {
                title: title,
                content: content
            })
            console.log("Document updated with ID: ", id);
            handleClose();
        } catch (error) {
            console.log('Error updating the document:', error);
            handleClose()
        }
    }

    return (
        <StyledDialog onClose={handleClose} open={open}>
            <DialogContent sx={{ padding: 0 }} className="secondDialog">

                <CardMedia
                    component="img"
                    alt={props.data.image}
                    image={props.data.image}
                    sx={{ padding: 0, wordBreak: 'break-all', overflow: 'hidden' }}
                />

                <StyledTitle
                    multiline
                    name='text'
                    maxRows={Infinity}
                    variant="standard"
                    placeholder="Title"
                    sx={{ width: '100%' }}
                    defaultValue={props.data.title}
                    InputProps={{ disableUnderline: true }}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <StyledContent
                    multiline
                    name='text'
                    maxRows={Infinity}
                    variant="standard"
                    placeholder="Note"
                    sx={{ width: '100%' }}
                    defaultValue={props.data.content}
                    InputProps={{ disableUnderline: true }}
                    onChange={(e) => setContent(e.target.value)}
                />

                {/* <DialogContentText>{props.data.time[toDate().toDateString()]}</DialogContentText> */}

            </DialogContent>

            <DialogActions disableSpacing sx={{ flex: '1 0 auto', padding: '4px 15px 4px 15px', boxShadow: '0 -2px 5px rgb(0 0 0 / 20%)' }} >

                <Box sx={{ padding: theme.spacing(0, 1.875, 0, 0) }}>
                    <Tooltip title="Remind me" arrow followCursor>
                        <StyledButton size="small" sx={{ cursor: 'no-drop', opacity: 0.4 }}>
                            <AddAlertOutlinedIcon sx={{ fontSize: "19px" }} />
                        </StyledButton >
                    </Tooltip>
                </Box>

                <Box sx={{ padding: theme.spacing(0, 1.875, 0, 0) }}>
                    <Tooltip title="Collaborator" arrow followCursor>
                        <StyledButton size="small" sx={{ cursor: 'no-drop', opacity: 0.4 }}>
                            <PersonAddAlt1OutlinedIcon sx={{ fontSize: "19px" }} />
                        </StyledButton >
                    </Tooltip>
                </Box>

                <Box sx={{ padding: theme.spacing(0, 1.875, 0, 0) }}>
                    <Tooltip title="Background options" arrow followCursor>
                        <StyledButton size="small">
                            <PaletteOutlinedIcon sx={{ fontSize: "19px" }} />
                        </StyledButton>
                    </Tooltip>
                </Box>

                <Box sx={{ padding: theme.spacing(0, 1.875, 0, 0) }}>
                    <Tooltip title="Add Image" arrow followCursor>
                        <StyledButton size="small">
                            <ImageOutlinedIcon sx={{ fontSize: "19px" }} />
                        </StyledButton>
                    </Tooltip>
                </Box>

                <Box sx={{ padding: theme.spacing(0, 1.875, 0, 0) }}>
                    <Tooltip title="Archive" arrow followCursor>
                        <StyledButton size="small" sx={{ cursor: 'no-drop', opacity: 0.4 }}>
                            <Archive sx={{ fontSize: "19px" }} />
                        </StyledButton>
                    </Tooltip>
                </Box>

                <Box sx={{ padding: theme.spacing(0, 1.875, 0, 0) }}>
                    <Tooltip title="Undo" arrow followCursor>
                        <StyledButton size="small" sx={{ cursor: 'no-drop', opacity: 0.4 }}>
                            <UndoIcon sx={{ fontSize: "19px" }} />
                        </StyledButton>
                    </Tooltip>
                </Box>

                <Box sx={{ padding: theme.spacing(0, 1.875, 0, 0) }}>
                    <Tooltip title="Redo" arrow followCursor>
                        <StyledButton size="small" sx={{ cursor: 'no-drop', opacity: 0.4 }}>
                            <RedoIcon sx={{ fontSize: "19px" }} />
                        </StyledButton>
                    </Tooltip>
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                <Stack spacing={1} direction="row">
                    <NoteButton variant="text" onClick={update}>
                        Update
                    </NoteButton>
                    <NoteButton variant="text" onClick={handleClose}>
                        Close
                    </NoteButton>
                </Stack>
            </DialogActions>

        </StyledDialog>
    );
}