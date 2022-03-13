import React from 'react';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';

const Loader = () => (
  <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
    <CircularProgress color="inherit" />
  </Backdrop>
);

export default Loader;
