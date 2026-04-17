import { useEffect } from 'react';

export const useImagePreload = (imageSources: string[]) => {
  useEffect(
    function preloadImages() {
      imageSources.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    },
    [imageSources],
  );
};
