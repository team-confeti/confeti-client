import { Dispatch, SetStateAction } from 'react';

import type { EventFormData } from '../types';

interface UseAgencyManagementProps {
  formData: EventFormData;
  setFormData: Dispatch<SetStateAction<EventFormData>>;
}

export const useAgencyManagement = ({
  setFormData,
}: UseAgencyManagementProps) => {
  const handleToggleAgency = (agencyId: number, agencyName: string) => {
    setFormData((prev) => {
      const exists = prev.selectedAgencies.find((a) => a.id === agencyId);
      if (exists) {
        return {
          ...prev,
          selectedAgencies: prev.selectedAgencies.filter(
            (a) => a.id !== agencyId,
          ),
        };
      } else {
        return {
          ...prev,
          selectedAgencies: [
            ...prev.selectedAgencies,
            { id: agencyId, name: agencyName, url: '', datetime: '' },
          ],
        };
      }
    });
  };

  const handleRemoveAgency = (agencyId: number) => {
    setFormData((prev) => ({
      ...prev,
      selectedAgencies: prev.selectedAgencies.filter((a) => a.id !== agencyId),
    }));
  };

  const handleAgencyChange = (
    agencyId: number,
    field: 'url' | 'datetime',
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      selectedAgencies: prev.selectedAgencies.map((agency) =>
        agency.id === agencyId ? { ...agency, [field]: value } : agency,
      ),
    }));
  };

  return {
    handleToggleAgency,
    handleRemoveAgency,
    handleAgencyChange,
  };
};
