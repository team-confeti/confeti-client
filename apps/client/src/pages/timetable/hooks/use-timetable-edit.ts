import { useState } from 'react';

export const useTimetableEdit = () => {
  const [isEditTimetableMode, setIsEditTimetableMode] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const toggleEditTimetableMode = () => {
    setIsEditTimetableMode((prev) => !prev);
    window.scrollTo({ top: 380 });
  };

  const toggleComplete = () => {
    setIsComplete((prev) => !prev);
  };

  return {
    isEditTimetableMode,
    isComplete,
    toggleEditTimetableMode,
    toggleComplete,
  };
};
