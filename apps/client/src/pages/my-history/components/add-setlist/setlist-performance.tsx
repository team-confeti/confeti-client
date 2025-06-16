import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, FestivalCard } from '@confeti/design-system';

import { routePath } from '@shared/router/path';
import { SetListPerformance } from '@shared/types/my-history-response';

import { useAddPerformanceMutation } from '@pages/my-history/hooks/use-add-performance-mutation';

import * as styles from './setlist-performance.css';

interface Props {
  performanceCount: number;
  performances: SetListPerformance[];
}

const SetlistPerformance = ({ performanceCount, performances }: Props) => {
  const navigate = useNavigate();
  const [selectedFestivals, setSelectedFestivals] = useState<
    Pick<SetListPerformance, 'type' | 'typeId'>[]
  >([]);

  const { mutate: addPerformanceToSetList } = useAddPerformanceMutation();

  // TODO: 1개 추가, 여러개 추가시 네비게이션 추가 필요
  // 1개 추가 -> 해당 공연의 셋리스트 페이지로 이동
  // 여러개 추가 -> 셋리스트 초기 페이지로 이동(현재 적용상태)
  const handleAddClick = () => {
    addPerformanceToSetList(selectedFestivals, {
      onSuccess: () => {
        navigate(routePath.MY_HISTORY);
      },
    });
  };

  const handleFestivalSelect = (
    typeId: number,
    isSelected: boolean,
    type: 'FESTIVAL' | 'CONCERT',
  ) => {
    setSelectedFestivals((prev) => {
      if (isSelected) {
        return [...prev, { type, typeId }];
      } else {
        return prev.filter((item) => item.typeId !== typeId);
      }
    });
  };

  return (
    <div className={styles.container}>
      <section className={styles.title}>
        <p>{performanceCount}개의 검색결과</p>
      </section>

      <section className={styles.performanceContainer}>
        {performances.map((performance) => (
          <div key={performance.typeId} className={styles.festivalCardWrapper}>
            <FestivalCard
              typeId={performance.typeId}
              title={performance.title}
              imageSrc={performance.posterUrl}
              selectable={true}
              isSelected={selectedFestivals.some(
                (item) => item.typeId === performance.typeId,
              )}
              onSelectChange={(_title, isSelected) =>
                handleFestivalSelect(
                  performance.typeId,
                  isSelected,
                  performance.type,
                )
              }
            />
          </div>
        ))}
      </section>

      <section className={styles.buttonSection}>
        <Button
          variant="add"
          text={'셋리스트 만들기'}
          disabled={selectedFestivals.length === 0}
          onClick={handleAddClick}
        />
      </section>
    </div>
  );
};

export default SetlistPerformance;
