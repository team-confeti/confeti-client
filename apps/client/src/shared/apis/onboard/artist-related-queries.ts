import { queryOptions } from '@tanstack/react-query';

import {
  getArtistRelatedArtist,
  getArtistRelatedKeyword,
} from './artist-related';

export const ARTIST_RELATED_ARTIST_QUERY_KEY = {
  ALL: ['related-artists'],
  RELATED_ARTIST: (artistId: string) => [
    ...ARTIST_RELATED_ARTIST_QUERY_KEY.ALL,
    'related-artists',
    artistId,
  ],
} as const;

export const ARTIST_RELATED_ARTIST_QUERY_OPTION = {
  ALL: () => queryOptions({ queryKey: ARTIST_RELATED_ARTIST_QUERY_KEY.ALL }),
  RELATED_ARTIST: (artistId: string) => ({
    queryKey: ARTIST_RELATED_ARTIST_QUERY_KEY.RELATED_ARTIST(artistId),
    queryFn: () => getArtistRelatedArtist(artistId),
  }),
};

export const ARTIST_RELATED_KEYWORDS_QUERY_KEY = {
  ALL: ['related-keywords'],
  RELATED_KEYWORD: (keyword: string) => [
    ...ARTIST_RELATED_KEYWORDS_QUERY_KEY.ALL,
    'related-keywords',
    keyword,
  ],
} as const;

export const ARTIST_RELATED_KEYWORDS_QUERY_OPTION = {
  ALL: () => queryOptions({ queryKey: ARTIST_RELATED_KEYWORDS_QUERY_KEY.ALL }),
  RELATED_KEYWORD: (keyword: string) => ({
    queryKey: ARTIST_RELATED_KEYWORDS_QUERY_KEY.RELATED_KEYWORD(keyword),
    queryFn: () => getArtistRelatedKeyword(keyword),
  }),
};
