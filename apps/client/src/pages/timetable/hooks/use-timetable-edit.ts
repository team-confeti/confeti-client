import { useState } from 'react';

export const useTimetableEdit = () => {
  const [isEditTimetableMode, setIsEditTimetableMode] = useState(false);

  const toggleEditTimetableMode = () => {
    setIsEditTimetableMode((prev) => !prev);
    window.scrollTo({ top: 380 });
  };

  return {
    isEditTimetableMode,
    toggleEditTimetableMode,
  };
};
