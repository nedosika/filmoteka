import React from 'react';
import {useNavigate} from "react-router-dom";

import Dialog from "../../components/Dialog";
import {Typography} from "@mui/material";

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
        <Dialog title="Removing film" open onClose={handleClose} onSubmit={handleSubmit}>
            <Typography>Are you sure?</Typography>
        </Dialog>
    );
};

export default AddFilmDialog;