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

const EditFilmDialog = ({id}) => {
    const mapState = (state) => ({
        isLoading: state.loading.isLoading,
        film: state.films.current
    })
    const {film, isLoading} = useSelector(mapState);
    const {updateFilm, getFilm, closeDialog, openDialog} = useActions();

    const [state, setState] = useState({});

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
            <TextField
                label="Image link"
                name="img"
                value={state.img}
                fullWidth
                margin="normal"
                onChange={handleChange}
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