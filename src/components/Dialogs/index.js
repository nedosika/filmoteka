import AddFilmDialog from './AddFilmDialog';
import ConfirmDialog from './ConfirmDialog';
import DeleteFilmDialog from './DeleteFilmDialog';
import DeleteFavoriteDialog from './DeleteFovoriteDialog';
import EditFilmDialog from './EditFilmDialog';
import AddFilmStepperDialog from './StepperDialog/AddFilmStepperDialog';

export const DIALOG_TYPES = {
  ADD_FILM: 'AddFilmDialog',
  EDIT_FILM: 'EditFilmDialog',
  DELETE_FILM: 'DeleteFilmDialog',
  CONFIRM_DIALOG: 'ConfirmDialog',
  DELETE_FILM_FROM_FAV: 'DeleteFavoriteDialog',
  ADD_FILM_STEPPER_DIALOG: 'AddFilmStepperDialog',
};

export const Dialogs = {
  AddFilmDialog,
  ConfirmDialog,
  EditFilmDialog,
  DeleteFilmDialog,
  DeleteFavoriteDialog,
  AddFilmStepperDialog,
};
