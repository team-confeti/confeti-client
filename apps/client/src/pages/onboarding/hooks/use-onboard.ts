import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { getArtistRelatedArtist } from '@shared/apis/onboard/artist-related';
import { ARTIST_RELATED_QUERY_OPTION } from '@shared/apis/onboard/artist-related-queries';
import { TOP_ARTIST_QUERY_OPTION } from '@shared/apis/onboard/top-artist-queries';
import { BaseResponse } from '@shared/types/api';
import { onboardResponse } from '@shared/types/onboard-response';

interface UseArtistRelatedKeywordProps {
  keyword: string;
  enabled: boolean;
  limit: number;
}

/**
 * 서버에서 인기 아티스트 목록을 가져오는 커스텀 훅
 *
 * 이 훅은 온보딩 화면에서 처음 진입할 때 사용됩니다.
 * 인기 아티스트 리스트를 서버에서 요청하여 반환합니다.
 *
 * @param limit - 가져올 아티스트의 최대 개수
 * @returns { data: onboard[] } - 인기 아티스트 목록 데이터
 */
export const useGetTopArtist = (limit: number) => {
  const { data } = useSuspenseQuery({
    ...TOP_ARTIST_QUERY_OPTION.TOP_ARTIST(limit),
  });

  return { data };
};

/**
 * 아티스트 연관 검색어를 가져오는 커스텀 훅
 *
 * 사용자가 입력한 검색 키워드에 맞춰 연관된 아티스트를 검색하여 가져옵니다.
 * 이 훅은 사용자가 입력한 검색 키워드에 따라 디바운싱 후 연관 검색어를 요청합니다.
 *
 * @param keyword - 사용자가 입력한 검색 키워드
 * @param enabled - 검색어가 있을 때만 쿼리를 실행하도록 설정하는 옵션
 * @param limit - 연관 검색어의 최대 개수
 * @returns { data: onboard[] | undefined } - 연관된 아티스트 데이터
 */
export const useArtistRelatedKeyword = ({
  keyword,
  enabled,
  limit,
}: UseArtistRelatedKeywordProps) => {
  const { data } = useQuery({
    ...ARTIST_RELATED_QUERY_OPTION.KEYWORD(keyword, limit),
    enabled,
  });

  return data;
};

/**
 * 아티스트 연관 아티스트를 가져오는 커스텀 훅
 *
 * 이 훅은 기준이 되는 아티스트 ID에 맞춰 해당 아티스트와 연관된 다른 아티스트 데이터를 가져옵니다.
 * 성공적으로 데이터를 가져오면 `setArtists` 함수를 사용하여 연관 아티스트 목록을 업데이트합니다.
 *
 * @param setArtists - 연관 아티스트 목록을 업데이트하는 상태 변경 함수
 * @returns { mutate: Mutation } - 아티스트 연관 아티스트 데이터를 가져오는 Mutation 함수
 */
export const useArtistRelatedArtist = () => {
  return useMutation<
    BaseResponse<onboardResponse>,
    Error,
    { artistId: string; limit: number }
  >({
    mutationFn: ({ artistId, limit }) => {
      return getArtistRelatedArtist(artistId, limit);
    },
  });
};
