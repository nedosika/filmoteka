import React from 'react';
import filmsActions from '../../actions/filmsActions';
import useSmartActionRTK from '../../hooks/useSmartActionRTK';
import useDialog from '../DialogManager/useDialog';
import ConfirmDialog from './ConfirmDialog';

const DeleteFilmDialog = ({ id }) => {
  const { closeDialog } = useDialog();
  const removeFilm = useSmartActionRTK(filmsActions.removeFilm, { notices: { fulfilled: 'Film removed' } });

  const handleRemove = () => {
    removeFilm(id);
    closeDialog();
  };

  return <ConfirmDialog title="Remove film" onSubmit={handleRemove} />;
};

export default DeleteFilmDialog;
