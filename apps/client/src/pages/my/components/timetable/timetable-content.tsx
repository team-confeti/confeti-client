import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { MY_TIMETABLE_QUERY_OPTIONS } from '@shared/apis/my/my-timetable-queries';
import { FestivalList } from '@shared/components';
import { SORT_OPTIONS } from '@shared/constants/sort-label';

import { TimetableListHeader } from '@pages/my/components/timetable/timetable-list-header';

import * as styles from './timetable-content.css';

export const TimetableContent = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const { data } = useSuspenseQuery(
    MY_TIMETABLE_QUERY_OPTIONS.OVERVIEW(SORT_OPTIONS.RECENT),
  );

  const handleEditModeToggle = () => {
    setIsEditMode((prev) => !prev);
    if (isEditMode) {
      setSelectedIds([]);
    }
  };

  const handleDelete = () => {
    // TODO: 선택된 항목 삭제 API 연동
    // TODO: 삭제확인 모달 추가
    console.log(selectedIds);
    setIsEditMode(false);
    setSelectedIds([]);
  };

  const toggleSelection = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleItemClick = (id: number) => {
    if (isEditMode) {
      toggleSelection(id);
    }
  };

  const festivals = data.timetables.map((timetable) => ({
    id: timetable.timetableFestivalId,
    posterUrl: timetable.posterUrl,
    title: timetable.title,
  }));

  return (
    <article className={styles.wrapper}>
      <TimetableListHeader
        totalCount={data.timetableCount}
        isEditMode={isEditMode}
        selectedCount={selectedIds.length}
        onEditModeToggle={handleEditModeToggle}
        onDelete={handleDelete}
      />
      <FestivalList>
        {festivals.map((festival) => (
          <FestivalList.Item
            key={festival.id}
            festival={festival}
            onClick={() => handleItemClick(festival.id)}
          >
            {isEditMode && (
              <FestivalList.Checkbox
                checked={selectedIds.includes(festival.id)}
                onChange={() => toggleSelection(festival.id)}
              />
            )}
          </FestivalList.Item>
        ))}
      </FestivalList>
    </article>
  );
};
