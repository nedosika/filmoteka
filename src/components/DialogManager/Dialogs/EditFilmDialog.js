import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";

import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import useActions from "../../../hooks/useActions";
import {DIALOG_TYPES} from "./";
import Loader from "../../Loader";
import Dialog from "../Dialog";
import useSmartAction from "../../../hooks/useSmartAction";
import ActionCreators from "../../../actions";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CardMedia from "@mui/material/CardMedia";

const EditFilmDialog = ({id}) => {
    const mapState = (state) => ({
        isLoading: state.loading.isLoading,
        film: state.films.current
    })
    const {film, isLoading} = useSelector(mapState);
    const {closeDialog, openDialog} = useActions();
    const updateFilm = useSmartAction(ActionCreators.updateFilm);
    const getFilm = useSmartAction(ActionCreators.getFilm);

    const [state, setState] = useState({
        name: '',
        img: '',
        description: '',
        genre: ''
    });

    useEffect(() => {
        getFilm(id);
    }, [id]);

    useEffect(() => {
        setState({...film});
    }, [film])

    const handleClose = () => {
        closeDialog();
    }

    const handleRemove = () => {
        openDialog(DIALOG_TYPES.DELETE_FILM, {id})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        updateFilm({...state})
        handleClose();
    }

    const handleChange = (event) => {
        setState((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    if (isLoading)
        return <Loader/>

    return (
        <Dialog
            title="Editing film"
            open
            onClose={handleClose}
            dialogActions={
                <DialogActions sx={{justifyContent: 'space-between', padding: '20px 24px'}}>
                    <Button variant="outlined" color="warning" onClick={handleRemove}>Remove</Button>
                    <Stack
                        direction='row'
                        spacing={2}
                    >
                        <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                        <Button variant="outlined" color="secondary" onClick={handleSubmit}>Approve</Button>
                    </Stack>
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
                        value={state.genre || ''}
                    >
                        <MenuItem value=''><em>None</em></MenuItem>
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
                    value={state.year}
                    fullWidth
                    onChange={handleChange}
                />
            </Stack>
            <TextField
                label="Image link"
                name="img"
                value={state.img}
                fullWidth
                margin="normal"
                onChange={handleChange}
            />
            <CardMedia
                component="img"
                height="140"
                image={state.img}
                alt="film image"
            />
            <TextField
                label="Description"
                name="description"
                multiline
                rows={4}
                value={state.description}
                fullWidth
                margin="normal"
                onChange={handleChange}
            />
        </Dialog>
    );
};

export default EditFilmDialog;