import { END_POINT } from '@shared/constants/api';
import { BaseResponse } from '@shared/types/api';
import { onboardResponse } from '@shared/types/onboard-response';

import { axiosInstance } from '../config/instance';

/**
 * 요청한 아티스트와 연관된 아티스트 데이터를 서버로부터 가져옵니다.
 *
 * @param artistId - 기준이 되는 아티스트의 ID
 * @returns `onboardResponse` 형태의 관련 아티스트 데이터
 */

export const getArtistRelatedArtist = async (
  artistId: string,
): Promise<onboardResponse> => {
  const response = await axiosInstance.get<BaseResponse<onboardResponse>>(
    END_POINT.GET_ARTIST_RELATED_ARTIST(artistId, 10),
  );
  return response.data.data;
};

/**
 * 입력한 키워드와 연관된 데이터를 서버로부터 가져옵니다.
 *
 * @param keyword - 기준이 되는 키워드 문자열
 * @returns `onboardResponse` 형태의 관련 키워드 데이터
 */

export const getArtistRelatedKeyword = async (
  keyword: string,
): Promise<onboardResponse> => {
  const response = await axiosInstance.get<BaseResponse<onboardResponse>>(
    END_POINT.GET_ARTIST_RELATED_KEYWORDS(keyword, 10),
  );
  return response.data.data;
};
