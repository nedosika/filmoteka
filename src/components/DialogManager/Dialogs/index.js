import AddFilmDialog from "./AddFilmDialog";
import EditFilmDialog from "./EditFilmDialog";

export {default} from "./Dialog";

export const DIALOG_TYPES = {
    ADD_FILM: 'AddFilmDialog',
    EDIT_FILM: 'EditFilmDialog',
    DELETE_FILM: 'DeleteFilmDialog',
    CONFIRM_DIALOG: 'ConfirmationDialog',
    DELETE_FILM_FROM_FAV: 'DeleteFavoriteDialog'
}

export {
    AddFilmDialog,
    EditFilmDialog
}