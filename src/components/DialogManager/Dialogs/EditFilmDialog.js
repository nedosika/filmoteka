import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";

import TextField from "@mui/material/TextField";

import Dialog from "./Dialog";
import useActions from "../../../hooks/useActions";

const EditFilmDialog = ({id}) => {
    const mapState = (state) => ({
        currentFilm: state.films.currentFilm
    })
    const {currentFilm} = useSelector(mapState);
    const {updateFilm, getFilm, closeDialog} = useActions();

    const [state, setState] = useState({...currentFilm});

    useEffect(() => {
        getFilm(id);
    }, [id]);

    const handleClose = () => {
        closeDialog();
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
    return (
        <Dialog
            title="Editing film"
            open
            onClose={handleClose}
            onSubmit={handleSubmit}
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