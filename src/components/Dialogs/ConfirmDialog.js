import React from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import useDialog from '../DialogManager/useDialog';
import Dialog from './Dialog';

const ConfirmDialog = ({ title, onSubmit }) => {
  const { closeDialog } = useDialog();
  const handleClose = () => {
    closeDialog();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
    handleClose();
  };

  return (
    <Dialog
      open
      title={title}
      onClose={handleClose}
      dialogActions={
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleSubmit}>
            Approve
          </Button>
        </DialogActions>
      }
    >
      <Typography>Are you sure?</Typography>
    </Dialog>
  );
};

export default ConfirmDialog;
