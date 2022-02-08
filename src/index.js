import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {SnackBarProvider} from "./hooks/useSnackBar";

ReactDOM.render(
    <React.StrictMode>
        <SnackBarProvider>
            <App/>
        </SnackBarProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
