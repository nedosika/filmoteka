import React, {useEffect} from "react";

import Router from "./router";
import useActions from "./hooks/useActions";
import SnackStack from "./components/SnackStack";
import {DialogProvider} from "./components/DialogManager/useDialog";

function App() {
    const {checkAuth} = useActions();

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <DialogProvider>
            <Router/>
            <SnackStack/>
        </DialogProvider>
    );
}

export default App;
