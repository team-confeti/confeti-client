import { queryOptions } from '@tanstack/react-query';

import { SETLIST_QUERY_KEY } from '@shared/constants/query-key';
import {
  ArtistMusicSearchRequest,
  MusicSearchRequest,
  SetListPerformanceRequest,
} from '@shared/types/my-history-response';

import {
  getArtistMusicSearch,
  getMusicSearch,
  getSetListDetail,
  getSetListPerformance,
} from './setlist';

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

  DETAIL: (setlistId: number) =>
    queryOptions({
      queryKey: SETLIST_QUERY_KEY.DETAIL(setlistId),
      queryFn: () => getSetListDetail(setlistId),
    }),
};
