import { RefObject, useEffect } from 'react';

const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  callback: () => void,
  enable: boolean = true,
) => {
  useEffect(() => {
    if (!enable || !ref.current) return;
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('pointerdown', handleClickOutside);
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, [ref, callback, enable]);
};

export default useClickOutside;
