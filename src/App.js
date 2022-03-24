import React from 'react';
import {DialogProvider} from './components/DialogManager/useDialog';
import SnackStack from './components/SnackStack';
import Router from './router';
import {Provider} from "react-redux";
import store from "./store";

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
