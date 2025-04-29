import { queryOptions } from '@tanstack/react-query';

import {
  ArtistMusicSearchRequest,
  MusicSearchRequest,
  SetListPerformanceRequest,
} from '@shared/types/my-history-response';

import {
  getArtistMusicSearch,
  getMusicSearch,
  getSetListPerformance,
} from './setlist';

export const SETLIST_QUERY_KEY = {
  ALL: ['setlist'],
  SEARCH_PERFORMANCE: (request: SetListPerformanceRequest) => [
    ...SETLIST_QUERY_KEY.ALL,
    'performance',
    request,
  ],
  SEARCH_MUSIC: (request: MusicSearchRequest) => [
    ...SETLIST_QUERY_KEY.ALL,
    'music',
    request,
  ],
  SEARCH_ARTIST_MUSIC: (request: ArtistMusicSearchRequest) => [
    ...SETLIST_QUERY_KEY.ALL,
    'artist-music',
    request,
  ],
};

export const SETLIST_QUERY_OPTION = {
  ALL: () =>
    queryOptions({
      queryKey: SETLIST_QUERY_KEY.ALL,
    }),
  SEARCH_PERFORMANCE: (request: SetListPerformanceRequest, enabled: boolean) =>
    queryOptions({
      queryKey: SETLIST_QUERY_KEY.SEARCH_PERFORMANCE(request),
      queryFn: () => getSetListPerformance(request),
      enabled,
    }),

  SEARCH_MUSIC: (request: MusicSearchRequest, enabled: boolean) =>
    queryOptions({
      queryKey: SETLIST_QUERY_KEY.SEARCH_MUSIC(request),
      queryFn: () => getMusicSearch(request),
      enabled,
    }),

  SEARCH_ARTIST_MUSIC: (request: ArtistMusicSearchRequest, enabled: boolean) =>
    queryOptions({
      queryKey: SETLIST_QUERY_KEY.SEARCH_ARTIST_MUSIC(request),
      queryFn: () => getArtistMusicSearch(request),
      enabled,
    }),
};
