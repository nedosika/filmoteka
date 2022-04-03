import React, { createContext, useContext, useState } from 'react';

const StepperContext = createContext({});

export const StepperProvider = ({ children }) => {
  const [values, setValues] = useState({});
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = (values) => {
    setValues((prevState) => ({
      ...prevState,
      ...values,
    }));
    setActiveStep((prevState) => prevState + 1);
  };

  const handlePrev = (values) => {
    if (activeStep !== 0) {
      setValues((prevState) => ({
        ...prevState,
        ...values,
      }));
      setActiveStep((prevState) => prevState - 1);
    }
  };

  return (
    <StepperContext.Provider
      value={{
        values,
        activeStep,
        onNext: handleNext,
        onPrev: handlePrev,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};

export const useStepper = () => useContext(StepperContext);

export default useStepper;
