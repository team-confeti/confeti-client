import { useNavigate } from 'react-router-dom';
import StepFive from '@pages/time-table/components/onboard/step-five';
import StepFour from '@pages/time-table/components/onboard/step-four';
import StepOne from '@pages/time-table/components/onboard/step-one';
import StepSix from '@pages/time-table/components/onboard/step-six';
import StepThree from '@pages/time-table/components/onboard/step-three';
import StepTwo from '@pages/time-table/components/onboard/step-two';

import { routePath } from '@shared/constants/path';
import { useFunnel } from '@shared/utils/use-funnel';

const TimeTableOnboard = () => {
  const navigate = useNavigate();

  const TOTAL_STEPS = 6;
  const { Funnel, Step, setStep } = useFunnel(
    TOTAL_STEPS,
    routePath.TIME_TABLE_OUTLET,
  );
  const handleNextStep = (nextStep: number) => () => {
    setStep(nextStep);
  };
  const handleNavigate = () => {
    navigate(routePath.ADD_FESTIVAL);
  };

  return (
    <Funnel>
      <Step name="1">
        <StepOne
          handleNextStep={handleNextStep(1)}
          handleNavigate={handleNavigate}
        />
      </Step>
      <Step name="2">
        <StepTwo
          handleNextStep={handleNextStep(1)}
          handleNavigate={handleNavigate}
        />
      </Step>
      <Step name="3">
        <StepThree
          handleNextStep={handleNextStep(1)}
          handleNavigate={handleNavigate}
        />
      </Step>
      <Step name="4">
        <StepFour
          handleNextStep={handleNextStep(1)}
          handleNavigate={handleNavigate}
        />
      </Step>
      <Step name="5">
        <StepFive
          handleNextStep={handleNextStep(1)}
          handleNavigate={handleNavigate}
        />
      </Step>
      <Step name="6">
        <StepSix
          handleNextStep={handleNextStep(1)}
          handleNavigate={handleNavigate}
        />
      </Step>
    </Funnel>
  );
};

export default TimeTableOnboard;
