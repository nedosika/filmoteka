import React from 'react';
import {useNavigate} from "react-router-dom";

import Dialog from "../../components/Dialog";
import {Typography} from "@mui/material";
import useActions from "../../hooks/useActions";
import {useRouter} from "../../hooks/useRouter";

const AddFilmDialog = () => {
    const {navigate, params} = useRouter();
    const {removeFilm} = useActions();

    const handleClose = () => {
        navigate(-1);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const {id} = params;

        removeFilm(id);

        handleClose();
    }

    return (
        <Dialog title="Removing film" open onClose={handleClose} onSubmit={handleSubmit}>
            <Typography>Are you sure?</Typography>
        </Dialog>
    );
};

export default AddFilmDialog;