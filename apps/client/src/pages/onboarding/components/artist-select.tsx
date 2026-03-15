import { useState } from 'react';

import { logClickEvent } from '@shared/analytics/logging';
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

  const handleSearchFocus = () => {
    logClickEvent({ name: 'click_onboarding_search_focus' });
    setViewState('search');
  };

  const handleEditClick = () => {
    setViewState('edit');
  };

  const handleBackToSelect = () => {
    logClickEvent({ name: 'click_navigation_back' });
    setViewState('select');
  };

  const handleNextClick = () => {
    setStep(1);
  };

  return (
    <SwitchCase
      value={viewState}
      caseBy={{
        search: () => <ArtistSelectNestedSearch onBack={handleBackToSelect} />,
        edit: () => <ArtistSelectNestedDelete onBack={handleBackToSelect} />,
        select: () => (
          <ArtistSelectNestedSelect
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
