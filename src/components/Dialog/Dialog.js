import React from 'react';

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import LoadingButton from "@mui/lab/LoadingButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";

export default ({
    children,
    title,
    description,
    onSubmit,
    onClose,
    open
}) =>
    <Dialog
        component="form"
        onSubmit={onSubmit}
        open={open}
        onClose={onClose}
    >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            <DialogContentText>
                {description}
            </DialogContentText>
            {children}
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Отмена</Button>
            <LoadingButton
                loading={false}
                variant="outlined"
                type="submit"
            >
                Подтвердить
            </LoadingButton>
        </DialogActions>
    </Dialog>