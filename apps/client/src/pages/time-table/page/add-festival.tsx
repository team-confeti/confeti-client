import { Button, FestivalCard, Header } from '@confeti/design-system';
import * as styles from './add-festival.css';
import useFestivalSelection from '../hooks/use-festival-selection';
import { useGetFestivalToAdd } from '../hooks/use-get-festival-to-add';
import { useCallback } from 'react';

const MAX_SELECTIONS = 3;

const AddFestival = () => {
  const { selectedFestivals, handleFestivalClick, showToast } =
    useFestivalSelection();
  const { festivals, fetchNextPage, hasNextPage } = useGetFestivalToAdd();

  const observerRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !hasNextPage) return;

      // 이전 observer가 있다면 disconnect
      const observer = new IntersectionObserver(
        (entries) => {
          // 교차되고 다음 페이지가 있을 때만 fetchNextPage 호출
          if (entries[0].isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        },
        { threshold: 0.1 },
      );

      observer.observe(node);

      return () => {
        observer.disconnect();
      };
    },
    [hasNextPage, fetchNextPage],
  );

  const handleAddClick = () => {
    if (selectedFestivals.length > MAX_SELECTIONS) {
      showToast();
    } else {
      // 타임테이블에 추가되는 로직 작성 예정
    }
  };

  return (
    <div className={styles.wrapper}>
      <Header
        variant="detail"
        title="페스티벌 추가하기"
        className={styles.headerLayout}
      />
      <div className={styles.container}>
        {festivals.map((festival) => {
          const isSelected = selectedFestivals.includes(festival.festivalId);
          return (
            <FestivalCard
              key={festival.festivalId}
              id={festival.festivalId}
              type="festival"
              title={festival.title}
              imageSrc={festival.posterUrl}
              selectable={true}
              isSelected={isSelected}
              onClick={() =>
                handleFestivalClick(festival.festivalId, isSelected)
              }
            />
          );
        })}
        {hasNextPage && <div ref={observerRef} style={{ height: '20px' }} />}
      </div>
      <div className={styles.buttonSection}>
        <Button
          variant="add"
          text={'추가하기'}
          disabled={selectedFestivals.length === 0}
          onClick={handleAddClick}
        />
      </div>
    </div>
  );
};

export default AddFestival;
