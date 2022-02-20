import React from 'react';

import ConfirmDialog from "./ConfirmDialog";
import ActionCreators from "../../../actions";
import useSmartAction from "../../../hooks/useSmartAction";
import useDialog from "../useDialog";

const DeleteFilmDialog = ({id}) => {
    const {closeDialog} = useDialog();
    const removeFilm = useSmartAction(ActionCreators.removeFilm);

    const handleRemove = () => {
        removeFilm(id);
        closeDialog();
    }

    return (
        <ConfirmDialog title='Remove film' onSubmit={handleRemove}/>
    );
};

export default DeleteFilmDialog;