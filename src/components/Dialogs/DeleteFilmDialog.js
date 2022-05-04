import React from 'react';
import filmsActions from '../../actions/filmsActions';
import useSmartActionRTK, { SMART_ACTION_OPTIONS } from '../../hooks/useSmartActionRTK';
import useDialog from '../DialogManager/useDialog';
import ConfirmDialog from './ConfirmDialog';

const DeleteFilmDialog = ({ id }) => {
  const { closeDialog } = useDialog();
  const { action: removeFilm } = useSmartActionRTK(filmsActions.removeFilm, {
    [SMART_ACTION_OPTIONS.success]: () => {
      closeDialog();
      return 'Film deleted';
    },
  });

  const handleRemove = () => {
    removeFilm(id);
  };

  return <ConfirmDialog title="Remove film" onSubmit={handleRemove} />;
};

export default DeleteFilmDialog;
