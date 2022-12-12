import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import Bricks from 'bricks.js'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import { Card, CardContent, CardActions, CardMedia, Typography, Box } from '@mui/material';
import { doc, collection, orderBy, query, deleteDoc, onSnapshot } from "firebase/firestore";
import { ArchiveOutlined as Archive, DeleteOutlineOutlined as Delete } from '@mui/icons-material';


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
    // const theme = useTheme();
    const [note, setNote] = useState([])
    const [open, setOpen] = useState(false);
    const [snackBar, setSnackBar] = useState(false);

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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Box className='container'>
                {note?.map((notes) => {
                    return (
                        <StyledCard key={notes.id} className="card-box">
                            <CardContent sx={{ p: 0 }} onClick={handleClickOpen}>
                                <CardMedia image={notes.image} component="img" alt={notes.image} />
                                <Title>{notes.title}</Title>
                                <Content>{notes.content}</Content>
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
                                    <StyledButton onClick={() => deleteNote(notes.id)}>
                                        <Delete sx={{ fontSize: "18px" }} />
                                    </StyledButton >
                                </Tooltip>

                            </CardActions>
                        </StyledCard>
                    )
                })}
            </Box >
            <Snackbar
                action={action}
                open={snackBar}
                message="Note Trash"
                onClose={closeSnackbar}
                autoHideDuration={6000}
            />
            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogContent sx={{ p: 0 }}>
                        <CardMedia image={note.image} component="img" alt={note.image} />
                        <Title>{note.title}</Title>
                        <Content>{note.content}</Content>
                        {/* <TimeStamp sx={{ fontSize: 10 }}>Created at: {notes.time.toDate().toDateString()}</TimeStamp> */}
                    </DialogContent>

                    <DialogActions>

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
                            <StyledButton >
                                <Delete sx={{ fontSize: "18px" }} />
                            </StyledButton >
                        </Tooltip>

                    </DialogActions>
                </Dialog>
            </div>
        </>
    )
}

export default NoteBox;