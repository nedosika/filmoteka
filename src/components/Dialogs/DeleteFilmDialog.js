import React from 'react';
import filmsActions from '@Actions/filmsActions';
import useDialog from '@Components/DialogManager/useDialog';
import useSmartActionRTK, { SMART_ACTION_OPTIONS } from '@Hooks/useSmartActionRTK';
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
