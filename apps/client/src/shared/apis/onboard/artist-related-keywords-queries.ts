import { queryOptions } from '@tanstack/react-query';

import { getArtistRelatedKeyword } from './artist-related-keywords';

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
