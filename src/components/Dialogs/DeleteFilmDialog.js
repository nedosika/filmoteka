import React from 'react';

import ConfirmDialog from "./ConfirmDialog";
import {removeFilm as removeFilmAction} from "../../actions";
import useSmartAction from "../../hooks/useSmartAction";
import useDialog from "../DialogManager/useDialog";

const DeleteFilmDialog = ({id}) => {
    const {closeDialog} = useDialog();
    const removeFilm = useSmartAction(removeFilmAction);

    const handleRemove = () => {
        removeFilm(id);
        closeDialog();
    }

    return (
        <ConfirmDialog title='Remove film' onSubmit={handleRemove}/>
    );
};

export default DeleteFilmDialog;