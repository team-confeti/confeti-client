import { useEffect } from 'react';

export const useImagePreload = (imageSources: string[]) => {
  useEffect(() => {
    imageSources.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [imageSources]);
};
