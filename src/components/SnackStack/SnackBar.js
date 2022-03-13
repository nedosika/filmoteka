import React from 'react';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import MUISnackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SlideTransition = ({ onEnd, ...props }) => <Slide {...props} onExited={onEnd} direction={'right'} />;

const SnackBar = ({ severity, onClose, onEnd, message = '', direction = 'right', ...props }) => {
  return (
    <MUISnackbar
      {...props}
      onClose={onClose}
      sx={{ position: 'static' }}
      autoHideDuration={6000}
      TransitionComponent={SlideTransition}
      TransitionProps={{ onEnd }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </MUISnackbar>
  );
};

export default SnackBar;
