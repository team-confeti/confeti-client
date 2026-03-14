import { getAccessToken } from '@confeti/core/auth';
import { LikeButton } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';
import { formatDate } from '@confeti/utils';

import { LogClickEvent, logClickEvent } from '@shared/analytics/logging';
import { useLikeMutation } from '@shared/hooks/queries/use-like-mutation';
import { useNavigateToDetail } from '@shared/hooks/use-navigate-to-detail';
import type { PerformanceType } from '@shared/types/performance-type';
import { MyPerformancesResponse } from '@shared/types/user-response';

import * as styles from './performance-list.css';

// TODO: widgets 레벨로 분리하기. 좋아요 버튼까지 분리해서 조합해서 사용 가능하도록 설계
const PerformanceList = ({ performances }: MyPerformancesResponse) => {
  const navigateToDetail = useNavigateToDetail();
  const { mutate } = useLikeMutation();

  const handleLike = (
    typeId: number,
    type: PerformanceType,
    action: 'LIKE' | 'UNLIKE',
  ) => {
    logClickEvent({
      name: 'click_like_performance',
      params: {
        source_page: 'my_confeti',
        action,
        target_type: type,
        target_id: typeId,
      },
    });
    mutate({ id: typeId, action, type });
  };

  const performanceItems = performances.map((performance) => ({
    ...performance,
    key: `${performance.type}-${performance.typeId}`,
    eventParams: {
      entry_point: 'favorite_performance' as const,
      target_id: performance.typeId,
    },
    handleClick: () => navigateToDetail(performance.type, performance.typeId),
  }));

  return (
    <ul className={styles.wrapper}>
      {performanceItems.map(
        ({
          key,
          title,
          posterUrl,
          startAt,
          endAt,
          area,
          type,
          typeId,
          isFavorite,
          eventParams,
          handleClick,
        }) => (
          <LogClickEvent
            key={key}
            name="click_my_overview_item"
            params={eventParams}
          >
            <li className={styles.performanceItem} onClick={handleClick}>
              <img src={posterUrl} alt={title} className={styles.image} />
              <div className={styles.info}>
                <div className={styles.header}>
                  <h2 className={styles.title}>{title}</h2>
                  <div
                    className={styles.likeButtonWrapper}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <LikeButton
                      className={styles.likeButton}
                      isFavorite={isFavorite}
                      onLikeToggle={(action) =>
                        handleLike(typeId, type, action)
                      }
                      isLoggedIn={!!getAccessToken()}
                    />
                  </div>
                </div>

                <div>
                  <div className={styles.description}>
                    <Icon name="time" width="1.4rem" height="1.4rem" />
                    <p>
                      {formatDate('', 'rangeStartEndYearBoth', startAt, endAt)}
                    </p>
                  </div>

                  <div className={styles.description}>
                    <Icon name="place" width="1.4rem" height="1.4rem" />
                    <p>{area}</p>
                  </div>
                </div>
              </div>
            </li>
          </LogClickEvent>
        ),
      )}
    </ul>
  );
};

export default PerformanceList;
