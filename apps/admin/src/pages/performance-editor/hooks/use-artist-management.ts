import { Dispatch, SetStateAction, useState } from 'react';

import { generateDateRange } from '@shared/utils';

import type { PerformanceArtist, PerformanceFormData } from '../types';

interface UseArtistManagementProps {
  formData: PerformanceFormData;
  setFormData: Dispatch<SetStateAction<PerformanceFormData>>;
}

export const useArtistManagement = ({
  formData,
  setFormData,
}: UseArtistManagementProps) => {
  const [showArtistDropdown, setShowArtistDropdown] = useState(false);
  const festivalDates = generateDateRange(formData.startDate, formData.endDate);

  const getDefaultFestivalDates = () =>
    formData.type === 'Festival' ? festivalDates : undefined;

  const handleAddArtist = (artist: PerformanceArtist) => {
    if (!formData.artists.find((a) => a.id === artist.id)) {
      setFormData((prev) => ({
        ...prev,
        artists: [
          ...prev.artists,
          {
            ...artist,
            festivalDates: getDefaultFestivalDates(),
          },
        ],
        artistSearch: '',
      }));
      setShowArtistDropdown(false);
    }
  };

  const handleAddCustomArtist = () => {
    const customArtist: PerformanceArtist = {
      id: Date.now(),
      name: formData.artistSearch.trim(),
      festivalDates: getDefaultFestivalDates(),
    };
    if (
      customArtist.name &&
      !formData.artists.find((a) => a.name === customArtist.name)
    ) {
      setFormData((prev) => ({
        ...prev,
        artists: [...prev.artists, customArtist],
        artistSearch: '',
      }));
      setShowArtistDropdown(false);
    }
  };

  const handleRemoveArtist = (index: number) => {
    const artist = formData.artists[index];

    setFormData((prev) => ({
      ...prev,
      artists: prev.artists.filter((_, i) => i !== index),
      timetableSlots: prev.timetableSlots.filter(
        (slot) => slot.artistId !== artist?.id,
      ),
    }));
  };

  const handleArtistSearchChange = (value: string) => {
    setFormData((prev) => ({ ...prev, artistSearch: value }));
    setShowArtistDropdown(value.length > 0);
  };

  const handleToggleArtistFestivalDate = (artistId: number, date: string) => {
    setFormData((prev) => {
      const artist = prev.artists.find(
        (currentArtist) => currentArtist.id === artistId,
      );

      if (!artist) {
        return prev;
      }

      const selectedFestivalDates = artist.festivalDates ?? [];
      const hasSelectedDate = selectedFestivalDates.includes(date);
      const nextFestivalDates = hasSelectedDate
        ? selectedFestivalDates.filter((selectedDate) => selectedDate !== date)
        : [...selectedFestivalDates, date];

      return {
        ...prev,
        artists: prev.artists.map((currentArtist) =>
          currentArtist.id === artistId
            ? {
                ...currentArtist,
                festivalDates: nextFestivalDates,
              }
            : currentArtist,
        ),
        timetableSlots: hasSelectedDate
          ? prev.timetableSlots.filter(
              (slot) => !(slot.artistId === artistId && slot.date === date),
            )
          : prev.timetableSlots,
      };
    });
  };

  return {
    showArtistDropdown,
    setShowArtistDropdown,
    handleAddArtist,
    handleAddCustomArtist,
    handleRemoveArtist,
    handleArtistSearchChange,
    handleToggleArtistFestivalDate,
  };
};
