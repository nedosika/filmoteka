import React from 'react';
import Stepper from '@Components/Stepper/Stepper';
import { StepperProvider } from '@Components/Stepper/useStepper';
import StepFirst from './StepFirst';
import StepThree from './StepThree';
import StepTwo from './StepTwo';

const AddFilmDialog = () => {
  return (
    <StepperProvider>
      <Stepper>
        <StepFirst />
        <StepTwo />
        <StepThree />
      </Stepper>
    </StepperProvider>
  );
};

export default AddFilmDialog;
