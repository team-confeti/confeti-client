import { useState } from 'react';
import { toast } from '@confeti/design-system';
import { MAX_SELECTIONS } from '../constants';

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

  const handleFestivalClick = (festivalId: number, isSelected: boolean) => {
    if (isSelected) {
      removeSelect(festivalId);
    } else {
      addSelect(festivalId);
    }
  };

  return {
    selectedFestivals,
    showToast,
    handleFestivalClick,
  };
};

export default useFestivalSelection;
