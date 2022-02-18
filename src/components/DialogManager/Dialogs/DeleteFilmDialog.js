import React from 'react';

import useActions from "../../../hooks/useActions";
import ConfirmDialog from "./ConfirmDialog";
import useSmartAction from "../../../hooks/useSmartAction";
import ActionCreators from "../../../actions";

const DeleteFilmDialog = ({id}) => {
    const {closeDialog} = useActions();
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