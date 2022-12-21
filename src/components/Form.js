import React, { useState, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import IconButton from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';
import { Popover, CardMedia, Stack } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import { Box, TextField, ClickAwayListener, Button } from '@mui/material';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';

import { db } from '../firebase/firebase';
import { storage } from "../firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const Container = styled(Box)(({ theme }) => ({
    margin: 'auto',
    width: '600px',
    display: 'flex',
    minHeight: '30px',
    borderRadius: '7px',
    borderStyle: 'solid',
    borderWidth: '1.2px',
    // padding: '5.5px 15px',
    flexDirection: 'column',
    boxShadow: `${theme.palette.border.shadow}`,
    borderColor: `${theme.palette.border.default}`,
}));

const StyledButton = styled(IconButton)(({ theme }) => ({
    padding: 8,
    margin: -8,
    marginRight: 4,
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

const StyledBox = styled(Box)(({ theme }) => ({
    width: 32,
    height: 32,
    borderRadius: 50,
    cursor: 'pointer',
    border: '2px solid',
    '&:hover': {
        border: '2px solid',
    },
}));

function Form() {
    const theme = useTheme();
    const [file, setFile] = useState("");
    const [color, setColor] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState([]);
    const [content, setContent] = useState("");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showTextField, setShowTextField] = useState(false);


    const containerRef = useRef();
    const inputRef = useRef(null);

    const handleClickAway = () => {
        setFile("")
        setColor("")
        setTitle("")
        setContent("")
        setShowTextField(false);
    }

    const closeForm = () => {
        handleClickAway();
    }

    const fileUpload = () => {
        inputRef.current.click();
    };

    const handleFileChange = (event) => {
        setImage(event.target.files[0]);
        setFile(URL.createObjectURL(event.target.files[0]));
    };

    const addNote = async (e) => {
        e.preventDefault();

        const storageRef = ref(storage, `/images/${image.name}`)
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            "state_changed",
            (snapshot) => { },
            (err) => console.log(err),
            async () => {
                var imgUrl = await getDownloadURL(uploadTask.snapshot.ref);
                try {
                    const docRef = await addDoc(collection(db, "notes"), {
                        title: title,
                        image: imgUrl,
                        content: content,
                        time: serverTimestamp(),
                    });
                    console.log("Document written with ID: ", docRef.id);
                    handleClickAway();
                } catch (e) {
                    console.error("Error adding document: ", e);
                    handleClickAway();
                }
            }
        )

        setShowTextField(false);
        setColor("")
        setFile("")
        setTitle("")
        setContent("")
    }

    const onTextAreaClick = () => {
        setShowTextField(true);
        containerRef.current.style.minheight = '70px'
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onSelectColor = color => {
        setColor(color);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Container ref={containerRef} style={{ background: (theme.palette.noteBg[color]), borderColor: (theme.palette.noteBg[color]) }}>
                {showTextField &&
                    <>
                        <CardMedia
                            image={file}
                            component="img"
                            alt={file}
                            sx={{ borderRadius: '7px 7px 0px 0px' }}
                        />
                        <TextField
                            multiline
                            value={title}
                            name='heading'
                            variant="standard"
                            placeholder="Title"
                            sx={{ marginBottom: '5px', padding: '5.5px 15px 0px 15px', }}
                            onChange={(e) => setTitle(e.target.value)}
                            InputProps={{ disableUnderline: true }}
                        />
                    </>
                }
                <TextField
                    multiline
                    name='text'
                    value={content}
                    maxRows={Infinity}
                    variant="standard"
                    onClick={onTextAreaClick}
                    placeholder="Take a note.."
                    sx={{ padding: '5.5px 15px', }}
                    InputProps={{ disableUnderline: true }}
                    onChange={(e) => setContent(e.target.value)}
                />
                {showTextField &&
                    <>
                        <CardActions disableSpacing sx={{ flex: '1 0 auto', marginTop: '5px', padding: '0px 15px 7px 15px' }} >

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
                                    <StyledButton size="small" onClick={handleClick}>
                                        <PaletteOutlinedIcon sx={{ fontSize: "19px" }} />
                                    </StyledButton>
                                </Tooltip>
                            </Box>

                            <Box sx={{ padding: theme.spacing(0, 1.875, 0, 0) }}>
                                <Tooltip title="Add Image" arrow followCursor>
                                    <StyledButton size="small" onClick={fileUpload}>
                                        <ImageOutlinedIcon sx={{ fontSize: "19px" }} />
                                    </StyledButton>
                                </Tooltip>
                                <input
                                    type="file"
                                    ref={inputRef}
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                            </Box>

                            <Box sx={{ padding: theme.spacing(0, 1.875, 0, 0) }}>
                                <Tooltip title="Archive" arrow followCursor>
                                    <StyledButton size="small" sx={{ cursor: 'no-drop', opacity: 0.4 }}>
                                        <ArchiveOutlinedIcon sx={{ fontSize: "19px" }} />
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
                                <NoteButton variant="text" onClick={addNote} startIcon={<AddOutlinedIcon />}>
                                    Add
                                </NoteButton>

                                <NoteButton variant="text" onClick={closeForm}>
                                    Close
                                </NoteButton>
                            </Stack>
                        </CardActions>

                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <ThemeProvider theme={theme}>
                                <Box sx={{ p: 2, display: 'flex', gap: theme.spacing(0.5), }}>
                                    {Object.keys(theme.palette.noteBg).map((background) => (
                                        <StyledBox
                                            key={background}
                                            onClick={() => onSelectColor(background)}
                                            sx={{
                                                background: (theme.palette.noteBg[background]),
                                                borderColor: (theme.palette.noteBg[background])
                                            }}
                                        />
                                    ))}
                                </Box>
                            </ThemeProvider>
                        </Popover>
                    </>
                }
            </Container>
        </ClickAwayListener >
    )
}

export default Form;