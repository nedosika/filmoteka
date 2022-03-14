import React from 'react';
import MUIDialog from '@mui/material/Dialog';
import useDialog from '../../DialogManager/useDialog';
import useStepper from './useStepper';

const StepperDialog = ({ children }) => {
  const { activeStep } = useStepper();
  const { closeDialog } = useDialog();

  return (
    <MUIDialog component="form" open onClose={closeDialog}>
      {children[activeStep]}
    </MUIDialog>
  );
};

export default StepperDialog;
