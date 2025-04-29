import StepOne from '@pages/time-table/components/onboard/step-one';

import { routePath } from '@shared/constants/path';
import { useFunnel } from '@shared/utils/use-funnel';

const TimeTableOnboard = () => {
  const TOTAL_STEPS = 6;
  const { Funnel, Step, setStep } = useFunnel(
    TOTAL_STEPS,
    routePath.TIME_TABLE_OUTLET,
  );

  const createHandleNextStep = (nextStep: number) => () => {
    setStep(nextStep);
  };

  return (
    <Funnel>
      <Step name="1">
        <StepOne handleNextStep={createHandleNextStep(1)} />
      </Step>
    </Funnel>
  );
};

export default TimeTableOnboard;
