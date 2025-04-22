import { queryOptions } from '@tanstack/react-query';

import {
  getArtistRelatedKeyword,
  getArtistSearch,
  getPerformancesSearch,
} from './search';

export const SEARCH_ARTIST_QUERY_KEY = {
  ALL: ['artist'],
  SEARCH_ARTIST: (keyword: string) => [
    ...SEARCH_ARTIST_QUERY_KEY.ALL,
    'search',
    keyword,
  ],
} as const;

export const SEARCH_ARTIST_QUERY_OPTION = {
  ALL: () => queryOptions({ queryKey: SEARCH_ARTIST_QUERY_KEY.ALL }),
  SEARCH_ARTIST: (keyword: string, enabled: boolean) => ({
    queryKey: SEARCH_ARTIST_QUERY_KEY.SEARCH_ARTIST(keyword),
    queryFn: () => getArtistSearch(keyword),
    enabled,
  }),
  SEARCH_RELATED_KEYWORD: (keyword: string, enabled: boolean) => ({
    queryKey: SEARCH_ARTIST_QUERY_KEY.SEARCH_ARTIST(keyword),
    queryFn: () => getArtistRelatedKeyword(keyword),
    enabled,
  }),
};

export const SEARCH_ARTIST_RELATED_QUERY_KEY = {
  ALL: ['performances'],
  SEARCH_PERFORMANCES: (artistId: string) => [
    ...SEARCH_ARTIST_RELATED_QUERY_KEY.ALL,
    'search',
    artistId,
  ],
} as const;

export const SEARCH_ARTIST_RELATED_QUERY_OPTION = {
  ALL: () => queryOptions({ queryKey: SEARCH_ARTIST_RELATED_QUERY_KEY.ALL }),
  SEARCH_PERFORMANCES: (artistId: string) => ({
    queryKey: SEARCH_ARTIST_RELATED_QUERY_KEY.SEARCH_PERFORMANCES(artistId),
    queryFn: () => getPerformancesSearch(artistId),
  }),
};
