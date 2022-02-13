import React from "react";
import {Provider} from "react-redux";

import store from "./store";
import Router from "./router";

import SnackStack from "./components/SnackStack";

function App() {
    return (
        <Provider store={store}>
            <Router/>
            <SnackStack/>
        </Provider>
    );
}

export default App;
