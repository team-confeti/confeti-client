import { useQuery } from '@tanstack/react-query';

import { ARTIST_RELATED_KEYWORDS_QUERY_OPTION } from '@shared/apis/onboard/artist-related-queries';
import { TOP_ARTIST_QUERY_OPTION } from '@shared/apis/onboard/top-artist-queries';

interface UseArtistRelatedKeywordProps {
  keyword: string;
  enabled: boolean;
}

/**
 * 🔍 최상단 추천 아티스트 목록을 가져오는 커스텀 훅
 * - 온보딩 화면 첫 진입 시 사용
 * - 서버에서 인기 아티스트 리스트를 불러옴
 */
export const useGetTopArtist = () => {
  const { data } = useQuery({
    ...TOP_ARTIST_QUERY_OPTION.TOP_ARTIST(),
  });

  return { data };
};

/**
 * 🔍 아티스트 연관 검색어를 가져오는 커스텀 훅
 *
 * @param keyword - 사용자가 입력한 검색 키워드
 * @param enabled - 키워드가 존재할 때만 쿼리를 실행
 *
 * - 키워드가 존재하지 않으면 API 요청을 막음
 * - 검색창에서 디바운싱 후 연관 검색어 요청 시 사용(use-debounce-keyword.ts)
 */
export const useArtistRelatedKeyword = ({
  keyword,
  enabled,
}: UseArtistRelatedKeywordProps) => {
  const { data } = useQuery({
    ...ARTIST_RELATED_KEYWORDS_QUERY_OPTION.RELATED_KEYWORD(keyword),
    enabled,
  });

  return data;
};

/**
 * 🔍 아티스트 연관 아티스트를 가져오는 커스텀 훅
 *
 * @param artistId - 기준이 되는 아티스트의 ID
 * - 해당 아티스트와 연관된 다른 아티스트 데이터를 서버에서 불러옴
 */
export const useArtistRelatedArtist = (artistId: string) => {
  const { data } = useQuery({
    ...ARTIST_RELATED_KEYWORDS_QUERY_OPTION.RELATED_KEYWORD(artistId),
  });

  return data;
};
