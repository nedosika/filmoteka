import React from 'react';
import { Skeleton } from '@mui/material';
import Card from '@mui/material/Card';

const FilmSkeleton = () => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Skeleton variant="rectangular" width="100%" height={140} />
      <Skeleton height={30} width="70%" sx={{ margin: '15px 15px 0 15px' }} />
      <Skeleton height={10} width="50%" sx={{ margin: '15px' }} />
      <Skeleton height={10} width="50%" sx={{ margin: '0 15px' }} />
      <Skeleton height={30} sx={{ margin: '35px 10px 13px 10px' }} />
    </Card>
  );
};

export default FilmSkeleton;
