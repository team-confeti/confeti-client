import { Dispatch, SetStateAction, useState } from 'react';

import type { EventFormData } from '../types';

interface UseArtistManagementProps {
  formData: EventFormData;
  setFormData: Dispatch<SetStateAction<EventFormData>>;
}

export const useArtistManagement = ({
  formData,
  setFormData,
}: UseArtistManagementProps) => {
  const [showArtistDropdown, setShowArtistDropdown] = useState(false);

  const handleAddArtist = (artist: { id: number; name: string }) => {
    if (!formData.artists.find((a) => a.id === artist.id)) {
      setFormData((prev) => ({
        ...prev,
        artists: [...prev.artists, artist],
        artistSearch: '',
      }));
      setShowArtistDropdown(false);
    }
  };

  const handleAddCustomArtist = () => {
    const customArtist = {
      id: Date.now(),
      name: formData.artistSearch.trim(),
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
    setFormData((prev) => ({
      ...prev,
      artists: prev.artists.filter((_, i) => i !== index),
    }));
  };

  const handleArtistSearchChange = (value: string) => {
    setFormData((prev) => ({ ...prev, artistSearch: value }));
    setShowArtistDropdown(value.length > 0);
  };

  return {
    showArtistDropdown,
    setShowArtistDropdown,
    handleAddArtist,
    handleAddCustomArtist,
    handleRemoveArtist,
    handleArtistSearchChange,
  };
};
