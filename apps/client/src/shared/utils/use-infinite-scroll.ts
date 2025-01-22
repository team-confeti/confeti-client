import { useCallback } from 'react';

export const useInfiniteScroll = (
  hasNextPage: boolean,
  fetchNextPage: () => void,
  threshold = 0.1,
) => {
  return useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !hasNextPage) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        },
        { threshold },
      );

      observer.observe(node);

      return () => {
        observer.disconnect();
      };
    },
    [hasNextPage, fetchNextPage, threshold],
  );
};
