import { captureException } from '@sentry/react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { getAccessToken } from '@confeti/core/auth';
import { HTTP_STATUS_CODE } from '@confeti/core/http';
import { Button, LikeButton, toast } from '@confeti/design-system';
import { formatDate } from '@confeti/utils';

import { logClickEvent } from '@shared/analytics/logging';
import { TIMETABLE_MUTATION_OPTIONS } from '@shared/apis/timetable/festival-timetable-mutations';
import { useLikeMutation } from '@shared/hooks/queries/use-like-mutation';
import { routePath } from '@shared/router/path';
import type { ReservationSchedule } from '@shared/types/performance-common';
import { buildPath } from '@shared/utils/build-path';
import { isHTTPErrorStatus } from '@shared/utils/error';

import { MAX_SELECTIONS } from '@pages/timetable/constants';

import * as styles from './performance-info.css';

interface FestivalPerformanceInfoProps {
  id: number;
  startAt: string;
  endAt: string;
  area: string;
  reservationSchedules: ReservationSchedule[];
  isFavorite: boolean;
  timetableId: number | null;
}

const FestivalPerformanceInfo = ({
  id,
  startAt,
  endAt,
  area,
  reservationSchedules,
  isFavorite,
  timetableId,
}: FestivalPerformanceInfoProps) => {
  const { mutate } = useLikeMutation();
  const { mutate: addTimeTableMutate } = useMutation({
    ...TIMETABLE_MUTATION_OPTIONS.POST_TIMETABLE(),
  });
  const navigate = useNavigate();
  const formattedDate = formatDate('', 'rangeStartYearOnly', startAt, endAt);

  const handleLike = (action: 'LIKE' | 'UNLIKE') => {
    logClickEvent({
      name: 'click_like_performance',
      params: {
        action,
        target_type: 'FESTIVAL',
        target_id: id,
      },
    });
    mutate({ id, action, type: 'FESTIVAL' });
  };

  const handleTimeTableCtaClick = () => {
    logClickEvent({
      name: 'click_timetable_cta',
      params: {
        action: timetableId ? 'VIEW' : 'CREATE',
      },
    });

    if (timetableId) {
      navigate(buildPath(routePath.TIMETABLE_DETAIL, { id: timetableId }));
    } else {
      addTimeTableMutate([{ festivalId: id }], {
        onSuccess: ({ timetableIds }) => {
          navigate(
            buildPath(routePath.TIMETABLE_DETAIL, {
              id: timetableIds[0],
            }),
          );
        },
        onError: (error) => {
          if (isHTTPErrorStatus(error, HTTP_STATUS_CODE.CONFLICT)) {
            toast({
              text: `페스티벌은 ${MAX_SELECTIONS}개까지만 추가할 수 있어요.`,
            });
          }
          captureException('페스티벌 타임테이블 생성 실패', {
            extra: {
              error,
            },
          });
          toast({
            text: `타임테이블 생성에 실패했어요.\n 잠시 후 다시 시도해주세요.`,
          });
        },
      });
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <section className={styles.contentContainer}>
          <div className={styles.header}>
            <h2 className={styles.sectionTitle}>공연 정보</h2>
            <LikeButton
              className={styles.likeButton}
              isFavorite={isFavorite}
              onLikeToggle={handleLike}
              isLoggedIn={Boolean(getAccessToken())}
            />
          </div>

          <div className={styles.detail}>
            <div className={styles.detailItem}>
              <div className={styles.detailTitle}>기간</div>
              <div className={styles.detailContent}>{formattedDate}</div>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.detailTitle}>장소</div>
              <div className={styles.detailContent}>{area}</div>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.detailTitle}>예매 일정</div>
              <div className={styles.detailContentList}>
                {reservationSchedules.length > 0 ? (
                  reservationSchedules.map((schedule) => (
                    <div
                      key={`${schedule.roundName}-${schedule.reserveAt}`}
                      className={styles.detailContent}
                    >
                      {schedule.roundName
                        ? `${schedule.roundName} · ${formatDate(
                            schedule.reserveAt,
                            'koFullDateTimeWithWeekday',
                          )}`
                        : formatDate(
                            schedule.reserveAt,
                            'koFullDateTimeWithWeekday',
                          )}
                    </div>
                  ))
                ) : (
                  <div className={styles.detailContent}>-</div>
                )}
              </div>
            </div>
          </div>
          <Button
            text={timetableId ? '내 타임테이블 보기' : '내 타임테이블 만들기'}
            variant="add"
            onClick={handleTimeTableCtaClick}
          />
        </section>
      </div>
    </section>
  );
};

export default FestivalPerformanceInfo;
