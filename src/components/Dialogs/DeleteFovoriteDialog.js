import React from 'react';
import favoritesActions from '../../actions/favoritesActions';
import useSmartAction from '../../hooks/useSmartAction';
import useDialog from '../DialogManager/useDialog';
import ConfirmDialog from './ConfirmDialog';

const DeleteFavoriteDialog = ({ id }) => {
  const { closeDialog } = useDialog();
  const removeFromFavorites = useSmartAction(favoritesActions.removeFromFavorites);

  const handleRemove = () => {
    removeFromFavorites(id);
    closeDialog();
  };

  return <ConfirmDialog title="Remove film from favorites" onSubmit={handleRemove} />;
};

export default DeleteFavoriteDialog;
