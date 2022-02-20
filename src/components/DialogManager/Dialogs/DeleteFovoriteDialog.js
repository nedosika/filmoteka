import React from 'react';

import ConfirmDialog from "./ConfirmDialog";
import ActionCreators from "../../../actions";
import useSmartAction from "../../../hooks/useSmartAction";
import useDialog from "../useDialog";

const DeleteFavoriteDialog = ({id}) => {
    const {closeDialog} = useDialog();
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