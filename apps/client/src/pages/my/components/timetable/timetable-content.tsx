import { useState } from 'react';

import { FestivalList } from '@shared/components/festival-list/festival-list';

import { TimetableListHeader } from '@pages/my/components/timetable/timetable-list-header';

// TODO: API 연동 후 실제 데이터로 교체
const MOCK_FESTIVALS = [
  {
    id: 1,
    posterUrl: 'https://picsum.photos/200/200?random=1',
    title: '2024 서울 재즈 페스티벌',
    dDay: 'D-5',
  },
  {
    id: 2,
    posterUrl: 'https://picsum.photos/200/200?random=2',
    title: 'IU 콘서트 H.E.R',
    dDay: 'D-12',
  },
  {
    id: 3,
    posterUrl: 'https://picsum.photos/200/200?random=3',
    title: '락페스티벌 2024',
    dDay: 'D-20',
  },
  {
    id: 4,
    posterUrl: 'https://picsum.photos/200/200?random=4',
    title: '뉴진스 Bunnies Camp 2024',
    dDay: 'D-30',
  },
  {
    id: 5,
    posterUrl: 'https://picsum.photos/200/200?random=5',
    title: '에픽하이 20주년 콘서트',
    dDay: 'D-45',
  },
];

export const TimetableContent = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

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

  return (
    <article>
      <TimetableListHeader
        totalCount={MOCK_FESTIVALS.length}
        isEditMode={isEditMode}
        selectedCount={selectedIds.length}
        onEditModeToggle={handleEditModeToggle}
        onDelete={handleDelete}
      />
      <FestivalList>
        {MOCK_FESTIVALS.map((festival) => (
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
