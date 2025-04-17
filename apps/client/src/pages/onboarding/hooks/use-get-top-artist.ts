import { useQuery } from '@tanstack/react-query';

import { TOP_ARTIST_QUERY_OPTION } from '@shared/apis/onboard/top-artist-queries';

export const useGetTopArtist = () => {
  const { data } = useQuery({
    ...TOP_ARTIST_QUERY_OPTION.TOP_ARTIST(),
  });
  return { data };
};
