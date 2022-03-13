import React, {
    createContext,
    useContext,
    useState
} from 'react';

const StepperContext = createContext({});

export const StepperProvider = ({children}) => {
    const [state, setState] = useState({});
    const [activeStep, setActiveStep] = useState(0);

    const handleChange = (field) => {
        setState((prevState) => ({
            ...prevState,
            ...field
        }));
    }

    const handleNext = () => {
        setActiveStep((prevState) => prevState + 1);
    }

    const handlePrev = () => {
        if (activeStep !== 0){
            setActiveStep((prevState) => prevState - 1);
        }
    }

    return (
        <StepperContext.Provider value={{
            state,
            activeStep,
            onChange: handleChange,
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