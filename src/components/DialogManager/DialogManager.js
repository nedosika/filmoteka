import React from 'react';
import {useSelector} from "react-redux";

import useActions from "../../hooks/useActions";
import * as Dialogs from "./Dialogs";

const DialogManager = () => {
    const mapState = (state) => state.dialogs;
    const dialogs = useSelector(mapState);
    const {} = useActions();

    const renderModals = dialogs.map(({type, props = {}}) => {
        const Component = Dialogs[type];
        return <Component {...props}/>
    });

    return (
        <div>
            {renderModals}
        </div>
    );
};

export default DialogManager;