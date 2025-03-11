import { useEffect, useState } from 'react';

export const useScrollAtBottom = () => {
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

export const useScrollPosition = () => {
  const [isDirectionDown, setIsDirectionDown] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsAtTop(scrollTop === 0);
      setIsDirectionDown(scrollTop > lastScrollY);
      lastScrollY = scrollTop;
    };

    setIsAtTop(window.scrollY === 0);
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isButtonHidden = isAtTop || isDirectionDown;

  return { isButtonHidden };
};
