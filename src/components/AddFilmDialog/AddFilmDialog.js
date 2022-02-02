import React from 'react';
import Dialog from "../Dialog";
import TextField from "@mui/material/TextField";
import {useNavigate} from "react-router-dom";

const AddFilmDialog = () => {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate(-1);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleClose();
    }

    return (
        <Dialog title="Adding films" open onClose={handleClose} onSubmit={handleSubmit}>
            <TextField
                label="Name"
                fullWidth
            />
            <TextField
                label="Year"
                fullWidth
            />
            <TextField
                label="Description"
                fullWidth
            />
        </Dialog>
    );
};

export default AddFilmDialog;