import { useMemo } from 'react';

/**
 * 복사된 이미지 데이터 처리 함수
 */
export const useCarouselData = (
  reservationBgUrl: string[],
  subtitle: string[],
  reserveAt: string[],
  typeId: number[],
  type: string[],
  detailRoutePath: string[],
) => {
  return useMemo(
    () => ({
      images: [
        reservationBgUrl[reservationBgUrl.length - 1],
        ...reservationBgUrl,
        reservationBgUrl[0],
      ],
      subtitles: [subtitle[subtitle.length - 1], ...subtitle, subtitle[0]],
      reserveDates: [
        reserveAt[reserveAt.length - 1],
        ...reserveAt,
        reserveAt[0],
      ],
      typeId: [typeId[typeId.length - 1], ...typeId, typeId[0]],
      type: [type[type.length - 1], ...type, type[0]],
      detailRoutePath: [
        detailRoutePath[detailRoutePath.length - 1],
        ...detailRoutePath,
        detailRoutePath[0],
      ],
    }),
    [reservationBgUrl, subtitle, reserveAt, typeId, type, detailRoutePath],
  );
};
