import React from 'react';
import {useRouter} from "../../../hooks/useRouter";
import Dialog from "./Dialog";
import {Typography} from "@mui/material";

const DeleteDialog = ({title, onSubmit}) => {
    const {navigate, params} = useRouter();

    const handleClose = () => {
        navigate(-1);
    }

    const handleSubmit = (e) => {
        const {id} = params;

        e.preventDefault();
        onSubmit(id);
        handleClose();
    }

    return (
        <Dialog title={title} open onClose={handleClose} onSubmit={handleSubmit}>
            <Typography>Are you sure?</Typography>
        </Dialog>
    );
};

export default DeleteDialog;