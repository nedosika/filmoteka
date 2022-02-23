import AddFilmDialog from "./AddFilmDialog";
import ConfirmDialog from "./ConfirmDialog";
import EditFilmDialog from "./EditFilmDialog";
import DeleteFilmDialog from "./DeleteFilmDialog";
import DeleteFavoriteDialog from "./DeleteFovoriteDialog";
import StepperDialog from "./StepperDialog";

export const DIALOG_TYPES = {
    ADD_FILM: 'AddFilmDialog',
    EDIT_FILM: 'EditFilmDialog',
    DELETE_FILM: 'DeleteFilmDialog',
    CONFIRM_DIALOG: 'ConfirmDialog',
    DELETE_FILM_FROM_FAV: 'DeleteFavoriteDialog',
    STEPPER_DIALOG: 'StepperDialog'
}

export const Dialogs = {
    AddFilmDialog,
    ConfirmDialog,
    StepperDialog,
    EditFilmDialog,
    DeleteFilmDialog,
    DeleteFavoriteDialog
}

