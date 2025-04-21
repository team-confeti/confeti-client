import { queryOptions } from '@tanstack/react-query';

import { getArtistRelatedArtist } from './artist-related-artist';

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
