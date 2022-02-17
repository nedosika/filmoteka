import React from 'react';
import {useSelector} from "react-redux";

import useActions from "../../hooks/useActions";
import {Dialogs} from "./Dialogs";

const DialogManager = () => {
    const mapState = (state) => state.dialogs;
    const dialogs = useSelector(mapState);
    const {} = useActions();

    return (
        <div>
            {
                dialogs.map(({type, props = {}}, index) => {
                    const Component = Dialogs[type];
                    return <Component {...props} key={type + index}/>
                })
            }
        </div>
    );
};

export default DialogManager;