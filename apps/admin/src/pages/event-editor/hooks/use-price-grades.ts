import { Dispatch, SetStateAction } from 'react';

import type { EventFormData } from '../types';

interface UsePriceGradesProps {
  formData: EventFormData;
  setFormData: Dispatch<SetStateAction<EventFormData>>;
}

export const usePriceGrades = ({ setFormData }: UsePriceGradesProps) => {
  const handleAddPriceGrade = () => {
    setFormData((prev) => ({
      ...prev,
      priceGrades: [...prev.priceGrades, { grade: '', price: '' }],
    }));
  };

  const handleRemovePriceGrade = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      priceGrades: prev.priceGrades.filter((_, i) => i !== index),
    }));
  };

  const handlePriceGradeChange = (
    index: number,
    field: 'grade' | 'price',
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      priceGrades: prev.priceGrades.map((grade, i) =>
        i === index ? { ...grade, [field]: value } : grade,
      ),
    }));
  };

  return {
    handleAddPriceGrade,
    handleRemovePriceGrade,
    handlePriceGradeChange,
  };
};
