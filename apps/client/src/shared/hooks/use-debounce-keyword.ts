import { useCallback, useEffect, useRef, useState } from 'react';

export const useDebouncedKeyword = (initialKeyword = '', delay = 500) => {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [debouncedKeyword, setDebouncedKeyword] = useState(initialKeyword);
  const timerRef = useRef<number | null>(null);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setKeyword(inputValue);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = window.setTimeout(() => {
        setDebouncedKeyword(inputValue);
      }, delay);
    },
    [delay],
  );

  const resetKeyword = useCallback(() => {
    setKeyword(initialKeyword);
    setDebouncedKeyword(initialKeyword);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, [initialKeyword]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setKeyword(initialKeyword);
    setDebouncedKeyword(initialKeyword);
  }, [initialKeyword]);

  return {
    keyword,
    debouncedKeyword,
    handleInputChange,
    resetKeyword,
  };
};
