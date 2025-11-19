import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { Button, FestivalCard } from '@confeti/design-system';

import { SETLIST_MUTATION_OPTIONS } from '@shared/apis/my-history/setlist-mutations';
import { routePath } from '@shared/router/path';
import { SetListPerformance } from '@shared/types/my-history-response';

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

  const { mutate: addPerformanceToSetList } = useMutation({
    ...SETLIST_MUTATION_OPTIONS.POST_ADD_PERFORMANCE_TO_SETLIST(),
    onSuccess: async () => {
      navigate(routePath.MY);
    },
  });

  const handleAddClick = () => {
    addPerformanceToSetList(selectedFestivals);
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
