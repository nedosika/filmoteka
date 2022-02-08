import React from 'react';
import {useNavigate} from "react-router-dom";

import TextField from "@mui/material/TextField";

import Dialog from "../../components/Dialog";
import useActions from "../../hooks/useActions";
import {SnackBarSeverities, useSnackBar} from "../../hooks/useSnackBar";

const AddDialog = () => {
    const navigate = useNavigate();
    const {addFilm} = useActions();
    const {showMessage} = useSnackBar();
    const [state, setState] = React.useState({
        name: '',
        img: '',
        description: ''
    })

    const handleClose = () => {
        navigate(-1);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addFilm({...state})
            .then(() => showMessage('Film added', SnackBarSeverities.success));

        handleClose();
    }

    const handleChange = (event) => {
        setState((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }
    return (
        <Dialog title="Adding film" open onClose={handleClose} onSubmit={handleSubmit}>
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

export default AddDialog;