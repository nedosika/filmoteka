import React from 'react';
import {useNavigate} from "react-router-dom";

import TextField from "@mui/material/TextField";

import Dialog from "../../components/Dialog";

const AddDialog = () => {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate(-1);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleClose();
    }

    return (
        <Dialog title="Adding film" open onClose={handleClose} onSubmit={handleSubmit}>
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

export default AddDialog;