import React, {useEffect} from "react";
import {Provider} from "react-redux";

import store from "./store";
import Router from "./router";
import SnackStack from "./components/SnackStack";
import {DialogProvider} from "./components/DialogManager/useDialog";
import {AuthService} from "./services";

function App() {
    useEffect(() => {
        console.log('app')
        AuthService.checkAuth().then(() => console.log('sss'));
    }, [])
    return (
        <Provider store={store}>
            <DialogProvider>
                <Router/>
                <SnackStack/>
            </DialogProvider>
        </Provider>
    );
}

export default App;
