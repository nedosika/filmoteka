import React from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import useDialog from '../DialogManager/useDialog';
import Dialog from '../Dialog/Dialog';

const ConfirmDialog = ({ title, onSubmit }) => {
  const { closeDialog } = useDialog();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
    closeDialog();
  };

  return (
    <Dialog
      open
      title={title}
      onClose={closeDialog}
      dialogActions={
        <DialogActions>
          <Button variant="outlined" onClick={closeDialog}>
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
