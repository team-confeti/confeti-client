import { useState } from 'react';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  Avatar,
  Button,
  Description,
  SearchBar,
  toast,
} from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

import {
  ONBOARD_MUTATION_OPTIONS,
  ONBOARD_QUERY_OPTIONS,
} from '@shared/apis/onboard/queries';
import { routePath } from '@shared/router/path';
import { onboard } from '@shared/types/onboard-response';

import { ONBOARD_LIMIT } from '../constants/limit';
import ArtistSearch from './artist-search';
import OnboardingChip from './onboarding-chip';

import * as styles from './artist-select.css';

interface ArtistSelectProps {
  setStep: (step: number) => void;
}

const ArtistSelect = ({ setStep }: ArtistSelectProps) => {
  const navigate = useNavigate();
  const [selectedArtistIds, setSelectedArtistIds] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const isFocused = searchParams.get('search') === 'true';

  const { data: topArtistData } = useSuspenseQuery({
    ...ONBOARD_QUERY_OPTIONS.TOP_ARTIST(ONBOARD_LIMIT.TOP_ARTIST),
  });
  const { data: selectedArtistData, refetch: refetchSelectedArtist } =
    useSuspenseQuery({
      ...ONBOARD_QUERY_OPTIONS.SELECTED_ARTIST(),
    });
  const [artists, setArtists] = useState<onboard[]>(topArtistData.artists);

  const { mutate: mutateRelatedArtist } = useMutation({
    ...ONBOARD_MUTATION_OPTIONS.ARTIST_RELATED_ARTIST(
      '',
      ONBOARD_LIMIT.RELATED_ARTIST,
    ),
  });
  const { mutate: mutateAuthOnboard } = useMutation({
    ...ONBOARD_MUTATION_OPTIONS.AUTH_ONBOARD(),
  });

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

    mutateRelatedArtist(
      { artistId, limit: ONBOARD_LIMIT.RELATED_ARTIST },
      {
        onSuccess: (data) => {
          setArtists(data.data.artists);
          refetchSelectedArtist();
        },
      },
    );
  };

  const handleNextClick = () => {
    mutateAuthOnboard(selectedArtistIds, {
      onSuccess: () => {
        setStep(1);
      },
      onError: () => {
        toast({
          text: '온보딩 처리 중 오류가 발생했어요. 다시 시도해주세요.',
          icon: <Icon name="warning" size="2rem" color="confeti_red" />,
        });
        navigate(routePath.ROOT);
      },
    });
  };

  return (
    <section className={styles.onboardingContentSection}>
      {isFocused ? (
        <ArtistSearch
          onArtistSelect={handleArtistClick}
          handleSearchParams={handleSearchArtistSelect}
        />
      ) : (
        <>
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
          <div className={styles.selectedArtistPriviewSection}>
            <div className={styles.selectedArtistPreview}>
              <div className={styles.selectedArtistList}>
                {selectedArtistData.data.artists.map((artist) => (
                  <div
                    key={artist.artistId}
                    className={styles.selectedArtistItem}
                  >
                    <Avatar
                      size="sesm"
                      src={artist.profileUrl}
                      alt={`${artist.name} 이미지`}
                      isHandleClick={false}
                    />
                  </div>
                ))}
              </div>
              {selectedArtistData.data.artists.length > 0 && (
                <div className={styles.selectedArtistItem}>
                  <OnboardingChip
                    count={selectedArtistData.data.artists.length}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.avatarGridSection}>
            {artists.map((artist) => (
              <div key={artist.artistId} className={styles.avatar}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <Avatar
                    size="xl"
                    src={artist.profileUrl}
                    alt={`${artist.name} 이미지`}
                    onClick={() => handleArtistClick(artist.artistId)}
                  />
                </motion.div>
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
        </>
      )}
    </section>
  );
};

export default ArtistSelect;
