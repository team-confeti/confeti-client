import { Button } from '@confeti/design-system';
import { routePath } from '@shared/constants/path';
import { useFunnel } from '@shared/utils/use-funnel';

import ArtistSelect from '../components/artist-select';
import OnBoardingComplete from '../components/onboarding-complete';
import { useGetTopArtist } from '../hooks/use-get-top-artist';

const Onboarding = () => {
  const TOTAL_STEPS = 2;
  const { Funnel, Step, setStep } = useFunnel(TOTAL_STEPS, routePath.ROOT);
  const { data: topArtistData } = useGetTopArtist();

  return (
    <Funnel>
      <Step name="1">
        <ArtistSelect artists={topArtistData?.artists}>
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
