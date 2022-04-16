import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useDialog from '../../DialogManager/useDialog';
import { useStepper } from '../../Stepper';

const StepThree = () => {
  const { closeDialog } = useDialog();
  const {
    onPrev,
    values: { isLoading, error },
  } = useStepper();

  return (
    <>
      <DialogTitle>Step 3 Saving</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <div>Added ok</div>
        )}
      </DialogContent>
      <DialogActions sx={{ padding: '20px 24px' }}>
        <Button variant="outlined" disabled={isLoading} onClick={onPrev}>
          Prev
        </Button>
        <Button variant="outlined" onClick={closeDialog} disabled={isLoading || error}>
          Ok
        </Button>
      </DialogActions>
    </>
  );
};

export default StepThree;
