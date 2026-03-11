import { Dispatch, SetStateAction } from 'react';

import type { PerformanceFormData } from '../types';

interface UseBookingScheduleProps {
  formData: PerformanceFormData;
  setFormData: Dispatch<SetStateAction<PerformanceFormData>>;
}

export const useBookingSchedule = ({
  setFormData,
}: UseBookingScheduleProps) => {
  const handleAddBookingSchedule = () => {
    setFormData((prev) => ({
      ...prev,
      bookingSchedules: [
        ...prev.bookingSchedules,
        { round: '', startDate: '' },
      ],
    }));
  };

  const handleRemoveBookingSchedule = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      bookingSchedules: prev.bookingSchedules.filter((_, i) => i !== index),
    }));
  };

  const handleBookingScheduleChange = (
    index: number,
    field: 'round' | 'startDate',
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      bookingSchedules: prev.bookingSchedules.map((schedule, i) =>
        i === index ? { ...schedule, [field]: value } : schedule,
      ),
    }));
  };

  return {
    handleAddBookingSchedule,
    handleRemoveBookingSchedule,
    handleBookingScheduleChange,
  };
};
