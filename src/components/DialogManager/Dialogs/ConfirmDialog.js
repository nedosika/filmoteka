import React from 'react';

import {Typography} from "@mui/material";

import Dialog from "./Dialog";
import useActions from "../../../hooks/useActions";

const ConfirmDialog = ({title, onSubmit}) => {
    const {closeDialog} = useActions();

    const handleClose = () => {
        closeDialog();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
        handleClose();
    }

    return (
        <Dialog title={title} open onClose={handleClose} onSubmit={handleSubmit}>
            <Typography>Are you sure?</Typography>
        </Dialog>
    );
};

export default ConfirmDialog;