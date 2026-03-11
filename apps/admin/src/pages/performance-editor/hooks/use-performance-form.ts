import { useState } from 'react';

import type { ExistingPerformance, PerformanceFormData } from '../types';

interface UsePerformanceFormProps {
  existingPerformance: ExistingPerformance | null;
}

export const usePerformanceForm = ({
  existingPerformance,
}: UsePerformanceFormProps) => {
  const [formData, setFormData] = useState<PerformanceFormData>({
    type: existingPerformance?.type || 'Festival',
    title: existingPerformance?.title || '',
    subtitle: existingPerformance?.subtitle || '',
    startDate: existingPerformance?.startDate || '',
    endDate: existingPerformance?.endDate || '',
    ageRating: '전체 관람가',
    durationMinutes: 120,
    bookingSchedules: [],
    selectedTicketingPlatforms: [],
    venueName: existingPerformance?.venueName || '',
    venueAddress: existingPerformance?.venueAddress || '',
    priceGrades: [],
    mainPoster: null,
    logo: null,
    mainPosterPreview: null,
    logoPreview: null,
    stages: [],
    artists: [],
    artistSearch: '',
    timetableSlots: [],
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return {
    formData,
    setFormData,
    handleInputChange,
  };
};
