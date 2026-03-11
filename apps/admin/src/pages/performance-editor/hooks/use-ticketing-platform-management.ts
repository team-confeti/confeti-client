import { Dispatch, SetStateAction } from 'react';

import type { PerformanceFormData } from '../types';

interface UseTicketingPlatformManagementProps {
  formData: PerformanceFormData;
  setFormData: Dispatch<SetStateAction<PerformanceFormData>>;
}

export const useTicketingPlatformManagement = ({
  setFormData,
}: UseTicketingPlatformManagementProps) => {
  const handleToggleTicketingPlatform = (
    ticketingPlatformId: number,
    ticketingPlatformName: string,
  ) => {
    setFormData((prev) => {
      const exists = prev.selectedTicketingPlatforms.find(
        (a) => a.id === ticketingPlatformId,
      );
      if (exists) {
        return {
          ...prev,
          selectedTicketingPlatforms: prev.selectedTicketingPlatforms.filter(
            (a) => a.id !== ticketingPlatformId,
          ),
        };
      } else {
        return {
          ...prev,
          selectedTicketingPlatforms: [
            ...prev.selectedTicketingPlatforms,
            {
              id: ticketingPlatformId,
              name: ticketingPlatformName,
              url: '',
              datetime: '',
            },
          ],
        };
      }
    });
  };

  const handleRemoveTicketingPlatform = (ticketingPlatformId: number) => {
    setFormData((prev) => ({
      ...prev,
      selectedTicketingPlatforms: prev.selectedTicketingPlatforms.filter(
        (a) => a.id !== ticketingPlatformId,
      ),
    }));
  };

  const handleTicketingPlatformChange = (
    ticketingPlatformId: number,
    field: 'url' | 'datetime',
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      selectedTicketingPlatforms: prev.selectedTicketingPlatforms.map(
        (platform) =>
          platform.id === ticketingPlatformId
            ? { ...platform, [field]: value }
            : platform,
      ),
    }));
  };

  return {
    handleToggleTicketingPlatform,
    handleRemoveTicketingPlatform,
    handleTicketingPlatformChange,
  };
};
