import AddFilmDialog from "./AddFilmDialog";
import ConfirmDialog from "./ConfirmDialog";
import EditFilmDialog from "./EditFilmDialog";
import DeleteFilmDialog from "./DeleteFilmDialog";
import DeleteFavoriteDialog from "./DeleteFovoriteDialog";

export {default} from "./Dialog";

export const DIALOG_TYPES = {
    ADD_FILM: 'AddFilmDialog',
    EDIT_FILM: 'EditFilmDialog',
    DELETE_FILM: 'DeleteFilmDialog',
    CONFIRM_DIALOG: 'ConfirmDialog',
    DELETE_FILM_FROM_FAV: 'DeleteFavoriteDialog',
}

export {
    AddFilmDialog,
    ConfirmDialog,
    EditFilmDialog,
    DeleteFilmDialog,
    DeleteFavoriteDialog
}