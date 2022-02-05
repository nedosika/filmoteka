import React from 'react';
import {useSelector} from "react-redux";

import TextField from "@mui/material/TextField";

import Dialog from "../../components/Dialog";
import useActions from "../../hooks/useActions";
import {useRouter} from "../../hooks/useRouter";

const EditFilmDialog = () => {
    const {navigate, params} = useRouter();
    const mapState = (state) => ({
        films: state.films.data
    })
    const {films} = useSelector(mapState);
    const {updateFilm} = useActions();
    const {id} = params;

    const film = films.find((film) => film.id === id);
    const [state, setState] = React.useState({...film})

    console.log(state)

    const handleClose = () => {
        navigate(-1);
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
        <Dialog title="Editing film" open onClose={handleClose} onSubmit={handleSubmit}>
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