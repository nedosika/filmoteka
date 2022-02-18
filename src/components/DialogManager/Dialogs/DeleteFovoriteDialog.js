import React from 'react';

import useActions from "../../../hooks/useActions";
import ConfirmDialog from "./ConfirmDialog";
import useSmartAction from "../../../hooks/useSmartAction";
import ActionCreators from "../../../actions";

const DeleteFavoriteDialog = ({id}) => {
    const {closeDialog} = useActions();
    const removeFromFavorites = useSmartAction(ActionCreators.removeFromFavorites);

    const handleRemove = () => {
        removeFromFavorites(id);
        closeDialog();
    }

    return (
        <ConfirmDialog title="Remove film from favorites" onSubmit={handleRemove}/>
    );
};

export default DeleteFavoriteDialog;