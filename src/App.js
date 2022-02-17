import React from "react";
import {Provider} from "react-redux";

import store from "./store";
import Router from "./router";

import SnackStack from "./components/SnackStack";
import DialogManager from "./components/DialogManager";

function App() {
    return (
        <Provider store={store}>
            <Router/>
            <SnackStack/>
            <DialogManager/>
        </Provider>
    );
}

export default App;
