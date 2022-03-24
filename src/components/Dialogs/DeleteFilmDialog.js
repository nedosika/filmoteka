import React from 'react';
import filmsActions from '../../actions/filmsActions';
import useSmartAction from '../../hooks/useSmartAction';
import useDialog from '../DialogManager/useDialog';
import ConfirmDialog from './ConfirmDialog';

const DeleteFilmDialog = ({ id }) => {
  const { closeDialog } = useDialog();
  const removeFilm = useSmartAction(filmsActions.removeFilm);

  const handleRemove = () => {
    removeFilm(id);
    closeDialog();
  };

  return <ConfirmDialog title="Remove film" onSubmit={handleRemove} />;
};

export default DeleteFilmDialog;
