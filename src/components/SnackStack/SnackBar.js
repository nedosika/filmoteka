import React from 'react';

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props}/>;
});

const SnackBar = (props) => {
    const {severity, onClose, message} = props;
    return <Snackbar
        {...props}
        sx={{position: 'static'}}
        autoHideDuration={6000}
    >
        <Alert onClose={onClose} severity={severity} sx={{width: '100%'}}>
            {message}
        </Alert>
    </Snackbar>
}

export default SnackBar;