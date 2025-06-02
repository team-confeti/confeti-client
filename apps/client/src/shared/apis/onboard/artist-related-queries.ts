import { queryOptions } from '@tanstack/react-query';

import { ARTIST_RELATED_QUERY_KEY } from '@shared/constants/query-key';

import {
  getArtistRelatedArtist,
  getArtistRelatedKeyword,
} from './artist-related';

export const ARTIST_RELATED_QUERY_OPTION = {
  ALL: () => queryOptions({ queryKey: ARTIST_RELATED_QUERY_KEY.ALL }),
  ARTIST: (artistId: string, limit: number) => ({
    queryKey: ARTIST_RELATED_QUERY_KEY.RELATED_ARTIST(artistId),
    queryFn: () => getArtistRelatedArtist(artistId, limit),
  }),

  KEYWORD: (keyword: string, limit: number) => ({
    queryKey: ARTIST_RELATED_QUERY_KEY.RELATED_KEYWORD(keyword),
    queryFn: () => getArtistRelatedKeyword(keyword, limit),
  }),
};
