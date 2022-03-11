import React from 'react';

import MUIDialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const Dialog =({
                    open,
                    title,
                    children,
                    description,
                    dialogActions,
                    onClose
                }) =>
    <MUIDialog
        component="form"
        onClose={onClose}
        open={open}
    >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            <DialogContentText>
                {description}
            </DialogContentText>
            {children}
        </DialogContent>
        {dialogActions}
    </MUIDialog>

export default Dialog;