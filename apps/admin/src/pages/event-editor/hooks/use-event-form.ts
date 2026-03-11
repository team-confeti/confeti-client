import { useState } from 'react';

import type { EventFormData, ExistingEvent } from '../types';

interface UseEventFormProps {
  existingEvent: ExistingEvent | null;
}

export const useEventForm = ({ existingEvent }: UseEventFormProps) => {
  const [formData, setFormData] = useState<EventFormData>({
    type: existingEvent?.type || 'Festival',
    title: existingEvent?.title || '',
    subtitle: existingEvent?.subtitle || '',
    startDate: existingEvent?.startDate || '',
    endDate: existingEvent?.endDate || '',
    ageRating: '전체 관람가',
    durationMinutes: 120,
    bookingSchedules: [],
    selectedAgencies: [],
    venueName: existingEvent?.venueName || '',
    venueAddress: existingEvent?.venueAddress || '',
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
