import React, { useState, useRef } from 'react';
import { ThemeProvider, useTheme } from '@mui/material/styles';
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
    const [color, setColor] = useState("");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showTextField, setShowTextField] = useState(false);


    const containerRef = useRef();

    const handleClickAway = () => {
        setColor("")
        setShowTextField(false);
        containerRef.current.style.minheight = '30px'
    }

    const onClose = () => {
        setShowTextField(false);
        setColor("")
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

    const onSelectColor = color => {
        setColor(color);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Container ref={containerRef} style={{ background: (theme.palette.noteBg[color]), borderColor: (theme.palette.noteBg[color]) }}>
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