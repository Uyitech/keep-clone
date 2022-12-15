import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import IconButton from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';
import { styled, Stack, useTheme } from '@mui/material';
// import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import { Box, Button, Tooltip } from '@mui/material';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';


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


function EditNote(props) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const editMe = () => {
        setIsEditing(true);
    }

    const handleClickOpen = () => {
        setOpen(true);
        console.log("Dialog")
    };

    const closeDialog = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog open={open} handleClickOpen={handleClickOpen} onClose={closeDialog}>
                <DialogContent sx={{ p: 0, width: 600 }}>

                    {/* <DialogTitle onClick={editMe} contentEditable={isEditing}>{props.note.title}</DialogTitle> */}

                    {/* <DialogContentText onClick={editMe} contentEditable={isEditing}>{props.note.content}</DialogContentText> */}

                </DialogContent>

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
                            <StyledButton size="small" onClick="">
                                <PaletteOutlinedIcon sx={{ fontSize: "19px" }} />
                            </StyledButton>
                        </Tooltip>
                    </Box>

                    <Box sx={{ padding: theme.spacing(0, 1.875, 0, 0) }}>
                        <Tooltip title="Add Image" arrow followCursor>
                            <StyledButton size="small" onClick="">
                                <ImageOutlinedIcon sx={{ fontSize: "19px" }} />
                            </StyledButton>
                        </Tooltip>
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

                    <Stack direction="row">
                        <NoteButton variant="text">
                            Close
                        </NoteButton>
                    </Stack>
                </CardActions>
            </Dialog>
        </div>
    );
}

export default EditNote;