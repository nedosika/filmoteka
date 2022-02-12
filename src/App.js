import React from "react";
import {Provider} from "react-redux";

import store from "./store";
import Router from "./router";

import MessageBox from "./components/MessageBox";

function App() {
    return (
        <Provider store={store}>
            <Router/>
            <MessageBox/>
        </Provider>
    );
}

export default App;
