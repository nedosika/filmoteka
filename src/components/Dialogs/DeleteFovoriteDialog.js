import React from 'react';
import { removeFromFavorites as removeFromFavoritesAction } from '../../actions';
import useSmartAction from '../../hooks/useSmartAction';
import useDialog from '../DialogManager/useDialog';
import ConfirmDialog from './ConfirmDialog';

const DeleteFavoriteDialog = ({ id }) => {
  const { closeDialog } = useDialog();
  const removeFromFavorites = useSmartAction(removeFromFavoritesAction);

  const handleRemove = () => {
    removeFromFavorites(id);
    closeDialog();
  };

  return <ConfirmDialog title="Remove film from favorites" onSubmit={handleRemove} />;
};

export default DeleteFavoriteDialog;
