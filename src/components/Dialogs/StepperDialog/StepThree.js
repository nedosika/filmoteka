import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useDialog from '../../DialogManager/useDialog';

const StepThree = () => {
  const { closeDialog } = useDialog();
  const { isLoading, error } = useSelector((state) => state.loading);

  const disabled = isLoading || error;

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
        <Button variant="outlined" disabled={disabled} onClick={closeDialog}>
          Ok
        </Button>
      </DialogActions>
    </>
  );
};

export default StepThree;
