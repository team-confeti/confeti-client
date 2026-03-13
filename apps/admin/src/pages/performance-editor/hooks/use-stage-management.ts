import { Dispatch, SetStateAction } from 'react';

import type { PerformanceFormData } from '../types';

interface UseStageManagementProps {
  formData: PerformanceFormData;
  setFormData: Dispatch<SetStateAction<PerformanceFormData>>;
}

export const useStageManagement = ({
  setFormData,
}: UseStageManagementProps) => {
  const handleAddStage = () => {
    setFormData((prev) => ({
      ...prev,
      stages: [...prev.stages, { name: '', order: prev.stages.length }],
    }));
  };

  const handleRemoveStage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      stages: prev.stages
        .filter((_, stageIndex) => stageIndex !== index)
        .map((stage, order) => ({
          ...stage,
          order,
        })),
      timetableSlots: prev.timetableSlots
        .filter((timeSlot) => timeSlot.stageIndex !== index)
        .map((timeSlot) => ({
          ...timeSlot,
          stageIndex:
            timeSlot.stageIndex > index
              ? timeSlot.stageIndex - 1
              : timeSlot.stageIndex,
        })),
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
