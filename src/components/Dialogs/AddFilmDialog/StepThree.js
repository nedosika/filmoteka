import React from 'react';
import { useNavigate } from 'react-router-dom';
import useDialog from '@Components/DialogManager/useDialog';
import { useStepper } from '@Components/Stepper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { PAGES } from 'router/Router';

const StepThree = () => {
  const navigate = useNavigate();
  const { closeDialog } = useDialog();
  const {
    onPrev,
    values: { isLoading, error, addedFilmId },
  } = useStepper();

  const handleClose = () => {
    closeDialog();
    navigate(`${PAGES.film}/${addedFilmId}`);
  };

  return (
    <>
      <DialogTitle data-testid="title-step-3">Step 3 Saving</DialogTitle>
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
        <Button variant="outlined" onClick={handleClose} disabled={isLoading || Boolean(error)}>
          Ok
        </Button>
      </DialogActions>
    </>
  );
};

export default StepThree;
