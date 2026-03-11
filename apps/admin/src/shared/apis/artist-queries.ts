import { queryOptions } from '@tanstack/react-query';

import { BaseResponse } from '@confeti/core/http';

import { get } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { ARTIST_QUERY_KEY } from '@shared/constants/query-key';
import { AdminArtistSearchResponses } from '@shared/types/api';

export const ARTIST_QUERY_OPTIONS = {
  ALL: () => queryOptions({ queryKey: ARTIST_QUERY_KEY.ALL }),
  SEARCH: (term: string, limit?: number) =>
    queryOptions({
      queryKey: ARTIST_QUERY_KEY.SEARCH(term),
      queryFn: () => searchArtists(term, limit),
      enabled: term.length > 0,
    }),
};

export const searchArtists = async (
  term: string,
  limit?: number,
): Promise<AdminArtistSearchResponses> => {
  const params = new URLSearchParams({ term });
  if (limit) params.set('limit', String(limit));

  const response = await get<BaseResponse<AdminArtistSearchResponses>>(
    `${END_POINT.GET_ARTIST_SEARCH}?${params.toString()}`,
  );
  return response.data;
};
