import { queryOptions } from '@tanstack/react-query';

import {
  getArtistRelatedArtist,
  getArtistRelatedKeyword,
} from './artist-related';

export const ARTIST_RELATED_QUERY_KEY = {
  ALL: ['related'],
  RELATED_ARTIST: (artistId: string) => [
    ...ARTIST_RELATED_QUERY_KEY.ALL,
    'artist',
    artistId,
  ],
  RELATED_KEYWORD: (keyword: string) => [
    ...ARTIST_RELATED_QUERY_KEY.ALL,
    'keyword',
    keyword,
  ],
} as const;

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
