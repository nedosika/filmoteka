import React from 'react';

import useActions from "../../../hooks/useActions";
import ConfirmDialog from "./ConfirmDialog";

const DeleteFavoriteDialog = ({id}) => {
    const {removeFromFavorites, closeDialog} = useActions();

    const handleRemove = () => {
        removeFromFavorites(id);
        closeDialog();
    }

    return (
        <ConfirmDialog title="Remove film from favorites" onSubmit={handleRemove}/>
    );
};

export default DeleteFavoriteDialog;