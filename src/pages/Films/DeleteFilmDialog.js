import React from 'react';
import useActions from "../../hooks/useActions";
import DeleteDialog from "../../components/DeleteDialog";

const DeleteFilmDialog = () => {
    const {removeFilm} = useActions();

    return (
        <DeleteDialog onSubmit={removeFilm}/>
    );
};

export default DeleteFilmDialog;