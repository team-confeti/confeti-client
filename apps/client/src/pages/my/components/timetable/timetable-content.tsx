'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { MY_TIMETABLE_QUERY_OPTIONS } from '@shared/apis/my/my-timetable-queries';
import { FestivalList } from '@shared/components';
import { SORT_OPTIONS } from '@shared/constants/sort-label';

import { TimetableListHeader } from './timetable-list-header';

interface Props {
  isEditMode: boolean;
  selectedIds: number[];
  sortOption: SORT_OPTIONS;
  orderBy: 'latest' | 'earliest';
  onEditModeToggle: () => void;
  onSortChange: (o: SORT_OPTIONS.RECENT | SORT_OPTIONS.OLDEST) => void;
  onDelete: () => void;
  onItemClick: (id: number) => void;
  onCheckboxToggle: (id: number) => void;
}

export const TimetableContent = ({
  isEditMode,
  selectedIds,
  sortOption,
  orderBy,
  onEditModeToggle,
  onSortChange,
  onDelete,
  onItemClick,
  onCheckboxToggle,
}: Props) => {
  const { data } = useSuspenseQuery(
    MY_TIMETABLE_QUERY_OPTIONS.ORDER_BY(orderBy),
  );

  const festivals = data.timetables.map((t) => ({
    id: t.timetableFestivalId,
    posterUrl: t.posterUrl,
    title: t.title,
  }));

  return (
    <>
      <TimetableListHeader
        totalCount={festivals.length}
        isEditMode={isEditMode}
        selectedCount={selectedIds.length}
        sortOption={sortOption as SORT_OPTIONS.RECENT | SORT_OPTIONS.OLDEST}
        onEditModeToggle={onEditModeToggle}
        onDelete={onDelete}
        onSortChange={onSortChange}
      />

      <FestivalList>
        {festivals.map((festival) => (
          <FestivalList.Item
            key={festival.id}
            festival={festival}
            onClick={() => onItemClick(festival.id)}
          >
            {isEditMode && (
              <FestivalList.Checkbox
                checked={selectedIds.includes(festival.id)}
                onChange={() => onCheckboxToggle(festival.id)}
              />
            )}
          </FestivalList.Item>
        ))}
      </FestivalList>
    </>
  );
};
