import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { Button } from '@confeti/design-system';

import { TOP_ARTIST_QUERY_OPTIONS } from '@shared/apis/onboard/top-artist-queries';
import { useFunnel } from '@shared/hooks/use-funnel';
import { routePath } from '@shared/router/path';
import { onboard } from '@shared/types/onboard-response';

import ArtistSelect from '../components/artist-select';
import OnBoardingComplete from '../components/onboarding-complete';
import { ONBOARD_LIMIT } from '../constants/limit';
import {
  useArtistRelatedArtist,
  usePostAuthOnboarding,
} from '../hooks/use-onboard-mutation';

import * as styles from './onboarding.css';

const Onboarding = () => {
  const TOTAL_STEPS = 2;
  const { Funnel, Step, setStep } = useFunnel(TOTAL_STEPS, routePath.ROOT);
  const { data: topArtistData } = useSuspenseQuery({
    ...TOP_ARTIST_QUERY_OPTIONS.TOP_ARTIST(ONBOARD_LIMIT.TOP_ARTIST),
  });

  const [artists, setArtists] = useState(topArtistData?.artists || []);
  const [selectedArtistIds, setSelectedArtistIds] = useState<string[]>([]);
  const { mutateAsync } = useArtistRelatedArtist();
  const { mutate: mutateAuthOnboard } = usePostAuthOnboarding();

  const handleArtistSelect = async (artistId: string) => {
    const updatedArtists = await fetchRelatedArtists(
      artistId,
      ONBOARD_LIMIT.RELATED_ARTIST,
    );
    updateRenderArtists(updatedArtists);
    updateSelectedArtistIds(artistId);
  };

  const fetchRelatedArtists = async (artistId: string, limit: number) => {
    const relatedArtist = await mutateAsync({
      artistId,
      limit,
    });
    return relatedArtist?.data?.artists || [];
  };

  const updateRenderArtists = (updatedArtists: onboard[]) => {
    setArtists(updatedArtists);
  };

  const updateSelectedArtistIds = (artistId: string) => {
    setSelectedArtistIds((prev) =>
      prev.includes(artistId) ? prev : [...prev, artistId],
    );
  };

  return (
    <Funnel>
      <Step name="1">
        <ArtistSelect artists={artists} onArtistSelect={handleArtistSelect}>
          <Button
            text={'다음'}
            variant={'add'}
            onClick={() => {
              mutateAuthOnboard(selectedArtistIds);
              setStep(1);
            }}
            disabled={selectedArtistIds.length < 1}
            className={styles.button}
          />
        </ArtistSelect>
      </Step>
      <Step name="2">
        <OnBoardingComplete>
          <Button
            text={'시작하기'}
            variant={'add'}
            onClick={() => setStep(2)}
            className={styles.button}
          />
        </OnBoardingComplete>
      </Step>
    </Funnel>
  );
};

export default Onboarding;
