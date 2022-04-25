import React from 'react';
import filmsActions from '../../actions/filmsActions';
import useSmartActionRTK, { SMART_ACTION_NOTICES_OPTION, SMART_ACTION_OPTIONS } from '../../hooks/useSmartActionRTK';
import useDialog from '../DialogManager/useDialog';
import ConfirmDialog from './ConfirmDialog';

const DeleteFilmDialog = ({ id }) => {
  const { closeDialog } = useDialog();
  const removeFilm = useSmartActionRTK(filmsActions.removeFilm, {
    [SMART_ACTION_OPTIONS.notices]: {
      [SMART_ACTION_NOTICES_OPTION.pending]: false,
      [SMART_ACTION_NOTICES_OPTION.success]: 'Film removed',
      [SMART_ACTION_NOTICES_OPTION.error]: true,
    },
    [SMART_ACTION_OPTIONS.done]: () => {},
  });

  const handleRemove = () => {
    removeFilm(id);
    closeDialog();
  };

  return <ConfirmDialog title="Remove film" onSubmit={handleRemove} />;
};

export default DeleteFilmDialog;
