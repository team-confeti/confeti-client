import { queryOptions } from '@tanstack/react-query';
import { getArtistSearch } from './search';
export const SEARCH_QUERY_KEY = {
  ALL: ['search'],
  SEARCH_ARTIST: (keyword: string) => [
    ...SEARCH_QUERY_KEY.ALL,
    'keyword',
    keyword,
  ],
} as const;

export const SEARCH_QUERY_OPTIONS = {
  ALL: () => queryOptions({ queryKey: SEARCH_QUERY_KEY.ALL }),
  SEARCH_ARTIST: (keyword: string, enabled: boolean) => ({
    queryKey: SEARCH_QUERY_KEY.SEARCH_ARTIST(keyword),
    queryFn: () => getArtistSearch(keyword),
    enabled,
  }),
};
