import { useState } from 'react';

const useEditModes = () => {
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
  };

  const toggleFestivalDeleteMode = () => {
    setIsFestivalDeleteMode((prev) => !prev);
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

export default useEditModes;
