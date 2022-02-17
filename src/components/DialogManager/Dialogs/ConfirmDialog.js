import React from 'react';

import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {Typography} from "@mui/material";

import Dialog from "../Dialog";
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
        <Dialog
            open
            title={title}
            onClose={handleClose}
            dialogActions={
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button variant="outlined" color="secondary" onClick={handleSubmit}>Approve</Button>
                </DialogActions>
            }
        >
            <Typography>Are you sure?</Typography>
        </Dialog>
    );
};

export default ConfirmDialog;