import React from "react";
import {Provider} from "react-redux";

import store from "./store";
import Router from "./router";
import SnackStack from "./components/SnackStack";
import {DialogProvider} from "./components/DialogManager/useDialog";

function App() {
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
