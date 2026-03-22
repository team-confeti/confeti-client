import { LoaderFunctionArgs } from 'react-router-dom';

import { getAccessToken } from '@confeti/core/auth';

import { getTimetableExists } from '@shared/apis/timetable/festival-timetable-queries';
import { TimetableExistsResponse } from '@shared/types/festival-timetable-response';

/**
 * 페스티벌 상세 진입 전에 현재 유저의 타임테이블 존재 여부를 불러와요.
 * 비로그인 상태에서는 조회하지 않고 `null`을 반환해 CTA를 기본 상태로 맞춰요.
 */
export const festivalTimetableExistsLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<TimetableExistsResponse> => {
  if (!getAccessToken()) {
    return { timetableId: null };
  }

  return getTimetableExists(Number(params.festivalId));
};
