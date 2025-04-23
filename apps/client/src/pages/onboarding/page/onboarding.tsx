import { useState } from 'react';

import { Button } from '@confeti/design-system';
import { routePath } from '@shared/constants/path';
import { useFunnel } from '@shared/utils/use-funnel';

import ArtistSelect from '../components/artist-select';
import OnBoardingComplete from '../components/onboarding-complete';
import { ONBOARD_LIMIT } from '../constants/limit';
import { useArtistRelatedArtist, useGetTopArtist } from '../hooks/use-onboard';

const Onboarding = () => {
  const TOTAL_STEPS = 2;
  const { Funnel, Step, setStep } = useFunnel(TOTAL_STEPS, routePath.ROOT);
  const { data: topArtistData } = useGetTopArtist(ONBOARD_LIMIT.TOP_ARTIST);
  const [artists, setArtists] = useState(topArtistData?.artists || []);
  const { mutateAsync } = useArtistRelatedArtist();

  const handleArtistSelect = async (artistId: string) => {
    const response = await mutateAsync({
      artistId,
      limit: ONBOARD_LIMIT.RELATED_ARTIST,
    });
    const updatedArtists = response?.data?.artists || [];
    setArtists(updatedArtists);
  };

  return (
    <Funnel>
      <Step name="1">
        <ArtistSelect artists={artists} onArtistSelect={handleArtistSelect}>
          <Button text={'다음'} variant={'add'} onClick={() => setStep(1)} />
        </ArtistSelect>
      </Step>
      <Step name="2">
        <OnBoardingComplete>
          <Button
            text={'시작하기'}
            variant={'add'}
            onClick={() => setStep(2)}
          />
        </OnBoardingComplete>
      </Step>
    </Funnel>
  );
};

export default Onboarding;
