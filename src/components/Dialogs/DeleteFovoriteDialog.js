import React from 'react';

import ConfirmDialog from './ConfirmDialog';
import { removeFromFavorites as removeFromFavoritesAction } from '../../actions';
import useSmartAction from '../../hooks/useSmartAction';
import useDialog from '../DialogManager/useDialog';

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
