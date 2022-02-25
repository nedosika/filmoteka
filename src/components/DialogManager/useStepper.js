import React, {createContext, useContext, useState} from 'react';

const StepperContext = createContext({});

export const StepperProvider = ({children}) => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevState) => prevState + 1);
    }

    const handlePrev = () => {
        if (activeStep !== 0)
            setActiveStep((prevState) => prevState - 1);
    }

    return (
        <StepperContext.Provider value={{
            activeStep,
            onNext: handleNext,
            onPrev: handlePrev
        }}>
            {children}
        </StepperContext.Provider>
    );
}

const UseStepper = () =>
    useContext(StepperContext)

export default UseStepper;