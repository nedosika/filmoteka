import React, { useEffect, useRef, useState } from 'react';
import { Skeleton } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';

const emptyImageUrl =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2PQLJct8f706qIUu-8prSvosyYjCkRRJLxESsxodRUs7YTwCzwj5cXybNk5vMcJGWs5w&usqp=CAU';

const Image = (props) => {
  const { image } = props;
  const imgRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    imgRef.current.onload = () => setIsLoading(false);
    imgRef.current.onerror = () => {
      imgRef.current.src = emptyImageUrl;
      setIsLoading(false);
    };
    imgRef.current.src = image;
  }, [image]);

  return (
    <>
      {isLoading && <Skeleton variant="rectangular" width="100%" height={140} />}
      <CardMedia component="img" sx={{ display: isLoading ? 'none' : 'block' }} ref={imgRef} {...props} />
    </>
  );
};

export default Image;
