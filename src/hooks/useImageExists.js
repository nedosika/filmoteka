import { useEffect, useState } from 'react';

const useImageExists = (url) => {
  const [isExists, setIsExists] = useState(null);

  useEffect(() => {
    setIsExists(null);

    const img = new Image();
    img.src = url;
    img.onload = () => setIsExists(true);
    img.onerror = () => setIsExists(false);
  }, [url]);

  return isExists;
};

export default useImageExists;
