import React, { useState, useRef } from 'react';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { Popover, CardMedia } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import { Box, TextField, ClickAwayListener, Button } from '@mui/material';

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

const Close = styled(Button)(({ theme }) => ({
    height: '36px',
    fontWeight: '500',
    overflow: 'hidden',
    padding: '8px 24px',
    borderRadius: '4px',
    whiteSpace: 'nowrap',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    textOverflow: 'ellipsis',
    textTransform: 'capitalize',
    letterSpacing: '0.0178571em',
    color: `${theme.palette.text.default}`,
    '&:hover': {
        backgroundColor: `${theme.palette.searchBar.light}`,
    },
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
    const [file, setFile] = useState();
    const [color, setColor] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState([]);
    const [content, setContent] = useState("");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showTextField, setShowTextField] = useState(false);


    const containerRef = useRef();
    const inputRef = useRef(null);

    const handleClickAway = () => {
        setColor("")
        setFile("")
        setShowTextField(false);
        containerRef.current.style.minheight = '30px'
    }

    const fileUpload = () => {
        inputRef.current.click();
    };

    const handleFileChange = event => {
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
                    addDoc(collection(db, "notes"), {
                        title: title,
                        content: content,
                        image: imgUrl,
                        time: serverTimestamp(),
                    });
                    console.log("Document written with ID: ", id)
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            }
        )

        setShowTextField(false);
        setColor("")
        setTitle("")
        setFile("")
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

    const onSelectColor = ({ color }) => {
        setColor(color);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Container ref={containerRef} style={{ background: (theme.palette.noteBg[color]), borderColor: (theme.palette.noteBg[color]) }}>
                {showTextField &&
                    <>
                        <CardMedia image={file} component="img" alt={file} sx={{ borderRadius: '7px 7px 0px 0px' }} />
                        <TextField
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
                    maxRows={Infinity}
                    variant="standard"
                    onClick={onTextAreaClick}
                    placeholder="Take a note..."
                    sx={{ padding: '5.5px 15px', }}
                    onChange={(e) => setContent(e.target.value)}
                    InputProps={{ disableUnderline: true }}
                />
                {showTextField &&
                    <>
                        <CardActions disableSpacing sx={{ flex: '1 0 auto', marginTop: '5px', padding: '0px 15px 5.5px 15px' }} >
                            <Box sx={{ padding: theme.spacing(0, 1.875, 0, 0) }}>
                                <Tooltip title="Background options" arrow followCursor>
                                    <StyledButton size="small" onClick={handleClick}>
                                        <PaletteOutlinedIcon fontSize="small" />
                                    </StyledButton>
                                </Tooltip>
                            </Box>

                            <Box sx={{ padding: theme.spacing(0, 1.875, 0, 0) }}>
                                <Tooltip title="Archive" arrow followCursor>
                                    <StyledButton size="small">
                                        <ArchiveOutlinedIcon fontSize="small" />
                                    </StyledButton>
                                </Tooltip>
                            </Box>

                            <Box sx={{ padding: theme.spacing(0, 1.875, 0, 0) }}>
                                <Tooltip title="Add Image" arrow followCursor>
                                    <StyledButton size="small" onClick={fileUpload}>
                                        <ImageOutlinedIcon fontSize="small" />
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

                            <Box sx={{ flexGrow: 1 }} />

                            <Close size="small" onClick={addNote}>
                                Close
                            </Close>
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