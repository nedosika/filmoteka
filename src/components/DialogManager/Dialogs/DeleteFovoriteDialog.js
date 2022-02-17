import React from 'react';
import useActions from "../../../hooks/useActions";
import DeleteDialog from "./DeleteDialog";

const DeleteFilmDialog = () => {
    const {removeFromFavorites} = useActions();

    return (
        <DeleteDialog title="Remove film" onSubmit={removeFromFavorites}/>
    );
};

export default DeleteFilmDialog;