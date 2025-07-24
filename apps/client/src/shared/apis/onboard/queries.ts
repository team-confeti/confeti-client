import { queryOptions } from '@tanstack/react-query';

import { END_POINT } from '@shared/constants/api';
import { ONBOARD_QUERY_KEY } from '@shared/constants/query-key';
import { BaseResponse } from '@shared/types/api';
import {
  onboardResponse,
  onboardStatusResponse,
} from '@shared/types/onboard-response';

import { get } from '../config/instance';

export const ONBOARD_QUERY_OPTIONS = {
  ALL: () => queryOptions({ queryKey: ONBOARD_QUERY_KEY.ALL }),
  STATUS: () =>
    queryOptions({
      queryKey: ONBOARD_QUERY_KEY.STATUS(),
      queryFn: () => getOnboardStatus(),
    }),
  TOP_ARTIST: (limit: number) =>
    queryOptions({
      queryKey: ONBOARD_QUERY_KEY.TOP_ARTIST(limit),
      queryFn: () => getTopArtist(limit),
    }),
  ARTIST_RELATED_ARTIST: (artistId: string, limit: number) => ({
    queryKey: ONBOARD_QUERY_KEY.ARTIST_RELATED_ARTIST(artistId),
    queryFn: () => getArtistRelatedArtist(artistId, limit),
  }),
  ARTIST_RELATED_KEYWORDS: (keyword: string, limit: number) => ({
    queryKey: ONBOARD_QUERY_KEY.ARTIST_RELATED_KEYWORDS(keyword),
    queryFn: () => getArtistRelatedKeyword(keyword, limit),
  }),
};

/**
 * 온보딩 상태를 가져옵니다.
 * @returns {Promise<onboardStatusResponse>} 온보딩 상태 (isOnboarded: boolean)
 */
export const getOnboardStatus = async (): Promise<onboardStatusResponse> => {
  const response = await get<BaseResponse<onboardStatusResponse>>(
    END_POINT.GET_ONBOARDING_STATUS,
  );
  return response.data;
};

/**
 * Top 아티스트 데이터를 가져옵니다.
 * @param {number} limit 가져올 아티스트 수 제한
 * @returns {Promise<onboardResponse>} 아티스트 목록 데이터
 */
export const getTopArtist = async (limit: number): Promise<onboardResponse> => {
  const response = await get<BaseResponse<onboardResponse>>(
    END_POINT.GET_TOP100_ARTIST(limit),
  );
  return response.data;
};

/**
 * 특정 아티스트의 연관 아티스트 데이터를 가져옵니다.
 * @param {string} artistId 기준 아티스트 ID
 * @param {number} limit 가져올 연관 아티스트 수 제한
 * @returns {Promise<BaseResponse<onboardResponse>>} 연관 아티스트 데이터
 */
export const getArtistRelatedArtist = async (
  artistId: string,
  limit: number,
): Promise<BaseResponse<onboardResponse>> => {
  const response = await get<BaseResponse<onboardResponse>>(
    END_POINT.GET_ARTIST_RELATED_ARTIST(artistId, limit),
  );
  return response;
};

/**
 * 키워드를 기반으로 연관 아티스트 데이터를 가져옵니다.
 * @param {string} keyword 검색 키워드
 * @param {number} limit 가져올 결과 수 제한
 * @returns {Promise<onboardResponse>} 연관 아티스트 데이터
 */
export const getArtistRelatedKeyword = async (
  keyword: string,
  limit: number,
): Promise<onboardResponse> => {
  const response = await get<BaseResponse<onboardResponse>>(
    END_POINT.GET_ARTIST_RELATED_KEYWORDS(keyword, limit),
  );
  return response.data;
};
