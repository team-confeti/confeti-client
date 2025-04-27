import { useState } from 'react';

export const useTimeTableEdit = () => {
  const [isEditTimeTableMode, setIsEditTimeTableMode] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const toggleEditTimeTableMode = () => {
    setIsEditTimeTableMode((prev) => !prev);
    window.scrollTo({ top: 380 });
  };

  const toggleComplete = () => {
    setIsComplete((prev) => !prev);
  };

  return {
    isEditTimeTableMode,
    isComplete,
    toggleEditTimeTableMode,
    toggleComplete,
  };
};
