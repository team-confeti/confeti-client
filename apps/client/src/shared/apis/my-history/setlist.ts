import { END_POINT } from '@shared/constants/api';
import { BaseResponse } from '@shared/types/api';
import {
  ArtistMusicSearchRequest,
  ArtistMusicSearchResponse,
  MusicSearchRequest,
  MusicSearchResponse,
  SetListPerformance,
  SetListPerformanceRequest,
  SetListPerformanceResponse,
} from '@shared/types/my-history-response';

import { get, post } from '../config/instance';

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
