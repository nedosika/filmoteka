import React from 'react';
import { StepperProvider } from './useStepper';
import StepperDialog from './StepperDialog';
import StepFirst from './StepFirst';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

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
