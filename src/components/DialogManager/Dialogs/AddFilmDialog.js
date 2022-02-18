import React from 'react';

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";

import Dialog from "../Dialog";
import useActions from "../../../hooks/useActions";
import useSmartAction from "../../../hooks/useSmartAction";
import ActionCreators from "../../../actions";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import {Stack} from "@mui/material";

const AddFilmDialog = () => {
    const {closeDialog} = useActions();
    const addFilm = useSmartAction(ActionCreators.addFilm);
    const [state, setState] = React.useState({
        name: '',
        img: '',
        description: '',
        genre: ''
    })

    const handleClose = () => {
        closeDialog();
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addFilm({...state})
        handleClose();
    }

    const handleChange = (event) => {
        setState((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }
    return (
        <Dialog
            title="Adding film"
            open
            onClose={handleClose}
            dialogActions={
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button variant="outlined" color="secondary" onClick={handleSubmit}>Approve</Button>
                </DialogActions>
            }
        >
            <TextField
                label="Name"
                name="name"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={state.name}
            />
            <Stack direction='row' spacing={2} sx={{width: '100%', marginTop: '10px'}}>
                <FormControl fullWidth>
                    <InputLabel>Genre</InputLabel>
                    <Select
                        name='genre'
                        label='Genre'
                        onChange={handleChange}
                        defaultValue='Detective'
                    >
                        <MenuItem value='Detective'>Detective</MenuItem>
                        <MenuItem value='Anime'>Anime</MenuItem>
                        <MenuItem value='BlockBaster'>BlockBaster</MenuItem>
                        <MenuItem value='RomCom'>RomCom</MenuItem>
                        <MenuItem value='SciFi'>SciFi</MenuItem>
                        <MenuItem value='Horror'>Horror</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    type="number"
                    label="Year"
                    name="year"
                    fullWidth
                    onChange={handleChange}
                />
            </Stack>
            <TextField
                label="Image link"
                name="img"
                fullWidth
                margin="normal"
                onChange={handleChange}
            />
            <TextField
                label="Description"
                name="description"
                multiline
                rows={4}
                fullWidth
                margin="normal"
                onChange={handleChange}
            />
        </Dialog>
    );
};

export default AddFilmDialog;