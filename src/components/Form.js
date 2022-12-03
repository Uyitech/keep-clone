import React, { useState, useRef } from 'react';
import { createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import { Box, TextField, ClickAwayListener, Button } from '@mui/material';


const Container = styled(Box)(({ theme }) => ({
    margin: 'auto',
    width: '600px',
    display: 'flex',
    minHeight: '30px',
    borderRadius: '7px',
    borderStyle: 'solid',
    borderWidth: '1.2px',
    padding: '5.5px 15px',
    flexDirection: 'column',
    boxShadow: `${theme.palette.border.shadow}`,
    borderColor: `${theme.palette.border.default}`,
    backgroundColor: `${theme.palette.noteBg.default}`,
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
    border: '2px solid',
    '&:hover': {
        border: '2px solid',
        borderColor: `${theme.palette.custom.border}`,
    },
}));

function Form() {
    const theme = createTheme();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showTextField, setShowTextField] = useState(false);

    const containerRef = useRef();

    const handleClickAway = () => {
        setShowTextField(false);
        containerRef.current.style.minheight = '30px'
    }

    const onClose = () => {
        setShowTextField(false);
    }

    const onTextChange = () => {

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

    const listColor = [
        { id: 1, bg: "#0000" },
        { id: 2, bg: "#5C2B29" },
        { id: 3, bg: "#614A19" },
        { id: 4, bg: "#635D18" },
        { id: 5, bg: "#345920" },
        { id: 6, bg: "#16504B" },
        { id: 7, bg: "#2D555E" },
        { id: 8, bg: "#1E3A5F" },
        { id: 9, bg: "#42275E" },
        { id: 10, bg: "#5B2245" },
        { id: 11, bg: "#442F19" },
        { id: 12, bg: "#3C3F43" },
    ]

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Container ref={containerRef}>
                {showTextField &&
                    <TextField
                        name='heading'
                        variant="standard"
                        placeholder="Title"
                        sx={{ marginBottom: '10px' }}
                        onChange={(e) => onTextChange(e)}
                        InputProps={{ disableUnderline: true }}
                    />
                }
                <TextField
                    multiline
                    name='text'
                    maxRows={Infinity}
                    variant="standard"
                    onClick={onTextAreaClick}
                    placeholder="Take a note..."
                    onChange={(e) => onTextChange(e)}
                    InputProps={{ disableUnderline: true }}
                />
                {showTextField &&
                    <>
                        <CardActions disableSpacing sx={{ padding: theme.spacing(0.5, 0, 0.5, 0), flex: '1 0 auto', marginTop: '15px' }}>
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
                                    <StyledButton size="small">
                                        <ImageOutlinedIcon fontSize="small" />
                                    </StyledButton>
                                </Tooltip>
                            </Box>

                            <Box sx={{ flexGrow: 1 }} />

                            <Close size="small" onClick={onClose}>
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

                            <Box sx={{ p: 2, display: 'flex', gap: theme.spacing(0.5), }}>
                                {
                                    listColor.map(background => (
                                        < StyledBox
                                            key={background.id}
                                            sx={{ background: background.bg, borderColor: background.bg }}
                                        />
                                    ))
                                }
                            </Box>
                        </Popover>
                    </>
                }
            </Container>
        </ClickAwayListener >
    )
}

export default Form;