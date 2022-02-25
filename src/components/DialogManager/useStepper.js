import React, {createContext, useContext, useState} from 'react';
import useDialog from "./useDialog";

const StepperContext = createContext({});

export const StepperProvider = ({children}) => {
    const [state, setState] = useState({});
    const [activeStep, setActiveStep] = useState(0);
    const {closeDialog} = useDialog();

    const handleChange = (event) => {
        setState((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    const handleNext = () => {
        setActiveStep((prevState) => prevState + 1);
    }

    const handlePrev = () => {
        if (activeStep !== 0)
            setActiveStep((prevState) => prevState - 1);
    }

    return (
        <StepperContext.Provider value={{
            state,
            activeStep,
            closeDialog,
            handleChange,
            onNext: handleNext,
            onPrev: handlePrev,
        }}>
            {children}
        </StepperContext.Provider>
    );
}

const UseStepper = () =>
    useContext(StepperContext)

export default UseStepper;