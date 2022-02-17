import React from 'react';

import useActions from "../../../hooks/useActions";
import ConfirmDialog from "./ConfirmDialog";

const DeleteFilmDialog = ({id}) => {
    const {removeFilm, closeDialog} = useActions();

    const handleRemove = () => {
        removeFilm(id);
        closeDialog();
    }

    return (
        <ConfirmDialog title='Remove film' onSubmit={handleRemove}/>
    );
};

export default DeleteFilmDialog;