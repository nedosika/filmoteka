import React, {createContext, useContext, useState} from 'react';
import {useSelector} from "react-redux";

import useDialog from "./useDialog";
import useSmartAction from "../../hooks/useSmartAction";
import filmsActionCreators from "../../actions/filmsActions";

const StepperContext = createContext({});

export const StepperProvider = ({children}) => {
    const [state, setState] = useState({});
    const [activeStep, setActiveStep] = useState(0);
    const {closeDialog} = useDialog();
    const addFilm = useSmartAction(filmsActionCreators.addFilm);
    const {isLoading, error} = useSelector(state => state.loading)

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

    const handleSubmit = () => {
        handleNext();
        addFilm(state);
    }

    return (
        <StepperContext.Provider value={{
            state,
            activeStep,
            closeDialog,
            isLoading,
            error,
            onChange: handleChange,
            onNext: handleNext,
            onPrev: handlePrev,
            onSubmit: handleSubmit
        }}>
            {children}
        </StepperContext.Provider>
    );
}

const UseStepper = () =>
    useContext(StepperContext)

export default UseStepper;