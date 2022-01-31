import React from "react";
import Router from "./router";
import {ProvideAuth} from "./hooks/useAuth";

function App() {
    return (
        <ProvideAuth>
            <Router/>
        </ProvideAuth>
    );
}

export default App;
