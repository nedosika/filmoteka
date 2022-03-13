import React from 'react';
import { useSelector } from 'react-redux';
import { Stack } from '@mui/material';
import useActions from '../../hooks/useActions';
import SnackBar from './SnackBar';

const SnackStack = () => {
  const mapState = (state) => ({
    notices: state.notices.allIds.map((id) => ({ id, ...state.notices.byId[id] })),
  });
  const { notices } = useSelector(mapState);
  const { hideNotice, removeNotice } = useActions();

  const handleClose = (key) => (event, reason) => {
    if (reason !== 'clickaway') {
      hideNotice(key);
    }
  };

  const handleEnd = (id) => () => {
    removeNotice(+id);
  };

  return (
    <Stack
      spacing={1}
      sx={{
        left: '24px',
        right: 'auto',
        bottom: '24px',
        position: 'fixed',
      }}
    >
      {notices.map(({ id, isOpen, message, severity }) => (
        <SnackBar
          key={id}
          open={isOpen}
          message={message}
          severity={severity}
          onEnd={handleEnd(id)}
          onClose={handleClose(id)}
        />
      ))}
    </Stack>
  );
};

export default SnackStack;
