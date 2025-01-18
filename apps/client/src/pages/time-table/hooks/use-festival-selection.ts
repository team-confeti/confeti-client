import { useState } from 'react';
import { toast } from '@confeti/design-system';

const MAX_SELECTIONS = 3;

const useFestivalSelection = () => {
  const [selectedFestivals, setSelectedFestivals] = useState<number[]>([]);

  const removeSelect = (festivalId: number) => {
    setSelectedFestivals((prev) => prev.filter((id) => id !== festivalId));
  };

  const addSelect = (festivalId: number) => {
    setSelectedFestivals((prev) => [...prev, festivalId]);
  };

  const showToast = () => {
    toast.default(`페스티벌은 ${MAX_SELECTIONS}개까지만 추가할 수 있어요.`, {
      position: 'middleCenter',
    });
  };

  const canAddFestival = selectedFestivals.length < MAX_SELECTIONS;

  const handleFestivalClick = (festivalId: number, isSelected: boolean) =>
    isSelected
      ? removeSelect(festivalId)
      : canAddFestival
        ? addSelect(festivalId)
        : showToast();

  return {
    selectedFestivals,
    canAddFestival,
    handleFestivalClick,
  };
};

export default useFestivalSelection;
