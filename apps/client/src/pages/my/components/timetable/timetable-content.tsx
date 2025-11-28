'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { MY_TIMETABLE_QUERY_OPTIONS } from '@shared/apis/my/my-timetable-queries';
import { FestivalList } from '@shared/components';

interface Props {
  isEditMode: boolean;
  selectedIds: number[];
  sortBy: 'latest' | 'earliest';
  onItemClick: (id: number) => void;
  onCheckboxToggle: (id: number) => void;
  setTotalCount: (count: number) => void;
}

export const TimetableContent = ({
  isEditMode,
  selectedIds,
  sortBy,
  onItemClick,
  onCheckboxToggle,
  setTotalCount,
}: Props) => {
  const { data } = useSuspenseQuery(MY_TIMETABLE_QUERY_OPTIONS.SORT_BY(sortBy));

  const festivals = data.timetables.map((t) => ({
    id: t.timetableFestivalId,
    posterUrl: t.posterUrl,
    title: t.title,
  }));
  setTotalCount(festivals.length);

  return (
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
  );
};
