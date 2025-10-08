import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { Avatar, Button, Description, SearchBar } from '@confeti/design-system';

import { ONBOARD_QUERY_OPTIONS } from '@shared/apis/onboard/queries';
import { onboard } from '@shared/types/onboard-response';

import { ONBOARD_LIMIT } from '../constants/limit';
import {
  useArtistRelatedArtist,
  usePostAuthOnboarding,
} from '../hooks/use-onboard-mutation';
import ArtistSearch from './artist-search';

import * as styles from './artist-select.css';

interface ArtistSelectProps {
  setStep: (step: number) => void;
}

const ArtistSelect = ({ setStep }: ArtistSelectProps) => {
  const { data: topArtistData } = useSuspenseQuery({
    ...ONBOARD_QUERY_OPTIONS.TOP_ARTIST(ONBOARD_LIMIT.TOP_ARTIST),
  });
  const { mutate: mutateRelateArtist } = useArtistRelatedArtist();
  const { mutate: mutateAuthOnboard } = usePostAuthOnboarding();

  const [artists, setArtists] = useState<onboard[]>(
    topArtistData?.artists || [],
  );
  const [selectedArtistIds, setSelectedArtistIds] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const isFocused = searchParams.get('search') === 'true';

  const handleSearchBarFocus = () => {
    setSearchParams({ search: 'true' });
  };

  const handleSearchArtistSelect = () => {
    setSearchParams({});
  };

  const handleArtistClick = (artistId: string) => {
    setSelectedArtistIds((prev) =>
      prev.includes(artistId) ? prev : [...prev, artistId],
    );

    mutateRelateArtist(
      { artistId, limit: ONBOARD_LIMIT.RELATED_ARTIST },
      {
        onSuccess: (data) => {
          setArtists(data.data.artists);
        },
      },
    );
  };

  const handleNextClick = () => {
    mutateAuthOnboard(selectedArtistIds);
    setStep(1);
  };

  if (isFocused) {
    return (
      <ArtistSearch
        onArtistSelect={(artistId) => handleArtistClick(artistId)}
        handleSearchParams={handleSearchArtistSelect}
      />
    );
  }

  return (
    <section className={styles.onboardingContentSection}>
      <Description.Text
        descriptionText={'선호하는 아티스트를\n모두 선택해주세요'}
        fontSize={20}
      />
      <div className={styles.searchBarSection}>
        <SearchBar
          showBackButton={false}
          placeholder="아티스트를 검색해주세요!"
          onFocus={handleSearchBarFocus}
        />
      </div>
      <div className={styles.avatarGridSection}>
        {artists.map((artist) => (
          <div key={artist.artistId} className={styles.avatar}>
            <Avatar
              size="xl"
              src={artist.profileUrl}
              alt={`${artist.name} 이미지`}
              onClick={() => handleArtistClick(artist.artistId)}
            />
            <p className={styles.artistName}>{artist.name}</p>
          </div>
        ))}
      </div>
      <Button
        text={'다음'}
        variant={'add'}
        onClick={handleNextClick}
        disabled={selectedArtistIds.length < 1}
        className={styles.button}
      />
    </section>
  );
};

export default ArtistSelect;
