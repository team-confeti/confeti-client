import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { ONBOARD_QUERY_OPTIONS } from '@shared/apis/onboard/queries';
import SwitchCase from '@shared/components/switch-case';

import ArtistSelectNestedDelete from './artist-select-nested-delete';
import ArtistSelectNestedSearch from './artist-select-nested-search';
import ArtistSelectNestedSelect from './artist-select-nested-select';

type ViewState = 'select' | 'search' | 'edit';

interface ArtistSelectProps {
  setStep: (step: number) => void;
}

const ArtistSelect = ({ setStep }: ArtistSelectProps) => {
  const [viewState, setViewState] = useState<ViewState>('select');
  const [targetArtistId, setTargetArtistId] = useState<string | null>(null);

  const { data: selectedArtistData } = useSuspenseQuery({
    ...ONBOARD_QUERY_OPTIONS.SELECTED_ARTIST(),
  });

  const handleSearchFocus = () => {
    setViewState('search');
  };

  const handleEditClick = () => {
    setViewState('edit');
  };

  const handleBackToSelect = () => {
    setViewState('select');
  };

  const handleNextClick = () => {
    setStep(1);
  };

  const handleArtistSelect = (artistId: string) => {
    setTargetArtistId(artistId);
    setViewState('select');
  };

  return (
    <SwitchCase
      value={viewState}
      caseBy={{
        search: () => (
          <ArtistSelectNestedSearch
            onArtistSelect={handleArtistSelect}
            onBack={handleBackToSelect}
          />
        ),
        edit: () => (
          <ArtistSelectNestedDelete
            selectedArtistData={selectedArtistData.data.artists}
            onBack={handleBackToSelect}
          />
        ),
        select: () => (
          <ArtistSelectNestedSelect
            targetArtistId={targetArtistId}
            setTargetArtistId={setTargetArtistId}
            onSearchFocus={handleSearchFocus}
            onEditClick={handleEditClick}
            onNextClick={handleNextClick}
          />
        ),
      }}
    />
  );
};

export default ArtistSelect;
