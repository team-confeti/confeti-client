import { useState } from 'react';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';

import {
  ONBOARD_MUTATION_OPTIONS,
  ONBOARD_QUERY_OPTIONS,
} from '@shared/apis/onboard/queries';
import SwitchCase from '@shared/components/switch-case';
import { ONBOARD_QUERY_KEY } from '@shared/constants/query-key';

import ArtistSelectNestedDelete from './artist-select-nested-delete';
import ArtistSelectNestedSearch from './artist-select-nested-search';
import ArtistSelectNestedSelect from './artist-select-nested-select';

type ViewState = 'select' | 'search' | 'edit';

interface ArtistSelectProps {
  setStep: (step: number) => void;
}

const ArtistSelect = ({ setStep }: ArtistSelectProps) => {
  const queryClient = useQueryClient();
  const [viewState, setViewState] = useState<ViewState>('select');
  const [targetArtistId, setTargetArtistId] = useState<string | null>(null);

  const { data: selectedArtistData } = useSuspenseQuery({
    ...ONBOARD_QUERY_OPTIONS.SELECTED_ARTIST(),
  });

  const { mutate: mutateSelectedArtist } = useMutation({
    ...ONBOARD_MUTATION_OPTIONS.SELECTED_ARTIST(),
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
    mutateSelectedArtist([artistId], {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ONBOARD_QUERY_KEY.SELECTED_ARTIST(),
        });
        setTargetArtistId(artistId);
        setViewState('select');
      },
    });
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
