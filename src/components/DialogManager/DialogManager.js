import React from 'react';

import {Dialogs} from "./Dialogs";
import {StepperProvider} from "../Stepper/useStepper";

const DialogManager = ({dialogs}) =>
    dialogs.map(({type, props = {}}, index) => {
        const Component = Dialogs[type];

        return (
            <StepperProvider>
                <Component
                    {...props}
                    key={type + index}
                />
            </StepperProvider>
        )
    })

export default DialogManager;