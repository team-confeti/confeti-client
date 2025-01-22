import { useState } from 'react';

export const useEditModes = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditTimeTableMode, setIsEditTimeTableMode] = useState(false);
  const [isFestivalDeleteMode, setIsFestivalDeleteMode] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(true);

  const resetModes = () => {
    setIsEditTimeTableMode(false);
    setIsFestivalDeleteMode(false);
  };

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
    setIsTextVisible(true);
    if (isEditTimeTableMode || isFestivalDeleteMode) resetModes();
  };

  const toggleEditTimeTableMode = () => {
    setIsEditTimeTableMode((prev) => !prev);
    window.scrollTo({ top: 380 });
  };

  const toggleFestivalDeleteMode = () => {
    setIsFestivalDeleteMode((prev) => !prev);
    window.scrollTo({ top: 0 });
  };

  const toggleTextVisibility = (visible: boolean) => {
    setIsTextVisible(visible);
  };

  return {
    isEditMode,
    isEditTimeTableMode,
    isFestivalDeleteMode,
    isTextVisible,
    toggleEditMode,
    toggleEditTimeTableMode,
    toggleFestivalDeleteMode,
    toggleTextVisibility,
    resetModes,
  };
};
