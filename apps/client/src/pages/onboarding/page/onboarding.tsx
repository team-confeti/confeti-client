import { useFunnel } from '@shared/hooks/use-funnel';
import { routePath } from '@shared/router/path';

import ArtistSelect from '../components/artist-select';
import OnBoardingComplete from '../components/onboarding-complete';

const Onboarding = () => {
  const TOTAL_STEPS = 2;
  const { Funnel, Step, setStep } = useFunnel(TOTAL_STEPS, routePath.ROOT);

  return (
    <Funnel>
      <Step name="1">
        <ArtistSelect setStep={setStep} />
      </Step>
      <Step name="2">
        <OnBoardingComplete setStep={setStep} />
      </Step>
    </Funnel>
  );
};

export default Onboarding;
