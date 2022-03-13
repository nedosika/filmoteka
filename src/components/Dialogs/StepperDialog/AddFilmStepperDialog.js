import React from 'react';
import StepFirst from './StepFirst';
import StepThree from './StepThree';
import StepTwo from './StepTwo';
import StepperDialog from './StepperDialog';
import { StepperProvider } from './useStepper';

const AddFilmStepperDialog = () => {
  return (
    <StepperProvider>
      <StepperDialog>
        <StepFirst />
        <StepTwo />
        <StepThree />
      </StepperDialog>
    </StepperProvider>
  );
};

export default AddFilmStepperDialog;
