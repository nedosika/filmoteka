import React, {
    createContext,
    useContext,
    useState
} from "react";

import DialogManager from "./index";

const DialogContext = createContext([]);

export const DialogProvider = ({children}) => {
    const [dialogs, setDialogs] = useState([]);

    const openDialog = (type, props) =>
        setDialogs((prevDialogs) =>
            [...prevDialogs, {type, props}]);

    const closeDialog = () =>
        setDialogs((prevDialogs) =>
            prevDialogs.slice(0, prevDialogs.length - 1));

    return <DialogContext.Provider value={{dialogs, openDialog, closeDialog}}>
        {children}
        <DialogManager
            dialogs={dialogs}
            openDialog={openDialog}
            closeDialog={closeDialog}
        />
    </DialogContext.Provider>
}

const useDialog = () =>
    useContext(DialogContext);

export default useDialog;