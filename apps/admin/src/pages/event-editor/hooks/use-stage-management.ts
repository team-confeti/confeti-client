import { Dispatch, SetStateAction } from 'react';

import type { EventFormData } from '../types';

interface UseStageManagementProps {
  formData: EventFormData;
  setFormData: Dispatch<SetStateAction<EventFormData>>;
}

export const useStageManagement = ({
  setFormData,
}: UseStageManagementProps) => {
  const handleAddStage = () => {
    setFormData((prev) => ({
      ...prev,
      stages: [...prev.stages, { name: '' }],
    }));
  };

  const handleRemoveStage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      stages: prev.stages.filter((_, i) => i !== index),
    }));
  };

  const handleStageChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      stages: prev.stages.map((stage, i) =>
        i === index ? { ...stage, name: value } : stage,
      ),
    }));
  };

  return {
    handleAddStage,
    handleRemoveStage,
    handleStageChange,
  };
};
