import { queryOptions } from '@tanstack/react-query';

import { del, get, patch, post } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { SETLIST_QUERY_KEY } from '@shared/constants/query-key';
import { BaseResponse } from '@shared/types/api';
import {
  AddMusicToSetListRequest,
  ArtistMusicSearchRequest,
  ArtistMusicSearchResponse,
  MusicSearchRequest,
  MusicSearchResponse,
  SetListDetail,
  SetListPerformance,
  SetListPerformanceRequest,
  SetListPerformanceResponse,
} from '@shared/types/my-history-response';

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

export const getSetListPerformance = async (
  request: SetListPerformanceRequest,
): Promise<SetListPerformanceResponse> => {
  const { pid, aid, term } = request;

  const query = new URLSearchParams();

  if (pid !== null) query.append('pid', String(pid));
  if (aid !== null) query.append('aid', aid);
  if (term !== null) query.append('term', term);

  const url = `my/setlists/search/performances?${query.toString()}`;

  const response = await get<BaseResponse<SetListPerformanceResponse>>(url);
  return response.data;
};

export const postAddPerformanceToSetList = async (
  items: Pick<SetListPerformance, 'type' | 'typeId'>[],
) => {
  const response = await post<BaseResponse<void>>(
    END_POINT.POST_ADD_PERFORMANCE_TO_SET_LIST,
    items,
  );

  return response.data;
};

export const getMusicSearch = async (
  request: MusicSearchRequest,
): Promise<MusicSearchResponse> => {
  const response = await get<BaseResponse<MusicSearchResponse>>(
    END_POINT.GET_MUSIC_SEARCH(request.term, request.offset, request.limit),
  );

  return response.data;
};

export const getArtistMusicSearch = async (
  request: ArtistMusicSearchRequest,
): Promise<ArtistMusicSearchResponse> => {
  const response = await get<BaseResponse<ArtistMusicSearchResponse>>(
    END_POINT.GET_ARTIST_MUSIC_SEARCH(
      request.aid,
      request.term,
      request.offset,
      request.limit,
    ),
  );
  return response.data;
};

export const getSetListDetail = async (
  setlistId: number,
): Promise<SetListDetail> => {
  const response = await get<BaseResponse<SetListDetail>>(
    END_POINT.GET_SET_LIST_DETAIL(setlistId),
  );
  return response.data;
};

export const deleteMusicFromSetList = async (
  setlistId: number,
  orders: number,
): Promise<string> => {
  const response = await del<BaseResponse<string>>(
    END_POINT.DELETE_MUSIC_FROM_SETLIST(setlistId, orders),
  );
  return response.data;
};

export const postStartEditSetList = async (
  setlistId: number,
): Promise<void> => {
  await post<BaseResponse<void>>(END_POINT.POST_START_EDIT_SETLIST(setlistId));
};

export const patchCompleteEditSetList = async (
  setlistId: number,
): Promise<void> => {
  await patch<BaseResponse<void>>(
    END_POINT.POST_COMPLETE_EDIT_SETLIST(setlistId),
  );
};

export const deleteCancelEditSetList = async (
  setlistId: number,
): Promise<void> => {
  await del<BaseResponse<void>>(
    END_POINT.DELETE_CANCEL_EDIT_SETLIST(setlistId),
  );
};

export const patchReorderSetList = async (
  setlistId: number,
  tracks: { trackId: string; orders: number }[],
): Promise<void> => {
  await patch<BaseResponse<void>>(
    END_POINT.PATCH_REORDER_SETLIST(setlistId),
    tracks,
  );
};

export const postAddMusicToSetList = async (
  setlistId: number,
  musics: AddMusicToSetListRequest[],
) => {
  await post<BaseResponse<void>>(
    END_POINT.POST_ADD_MUSIC_TO_SETLIST(setlistId),
    musics,
  );
};
