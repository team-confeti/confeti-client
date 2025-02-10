import { useState, useEffect } from 'react';

export const useScrollPosition = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const isBottom = scrollTop + windowHeight >= documentHeight - 100;
      setIsAtBottom(isBottom);
    };

    setIsAtBottom(false);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isAtBottom;
};

export const useScrollDirection = () => {
  const [isDirectionUp, setIsDirectionAtUp] = useState(true);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        setIsDirectionAtUp(true);
      } else if (e.deltaY < 0) {
        setIsDirectionAtUp(false);
      }
    };

    window.addEventListener('wheel', handleWheel);

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return isDirectionUp;
};

export const useScrollTop = () => {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const isTop = scrollTop === 0;
      setIsAtTop(isTop);
    };

    setIsAtTop(window.scrollY === 0);
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isAtTop;
};
