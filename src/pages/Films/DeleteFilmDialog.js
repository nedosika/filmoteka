import React from 'react';

import useActions from "../../hooks/useActions";
import DeleteDialog from "../../components/DeleteDialog";
import {SnackBarSeverities, useSnackBar} from "../../hooks/useSnackBar";

const DeleteFilmDialog = () => {
    const {removeFilm} = useActions();
    const {showMessage} = useSnackBar();

    const handleSubmit = (id) => {
        removeFilm(id).then(() => showMessage('Film removed', SnackBarSeverities.success));
    }

    return (
        <DeleteDialog onSubmit={handleSubmit}/>
    );
};

export default DeleteFilmDialog;