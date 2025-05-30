import { useNavigate } from 'react-router-dom';
import ClickBlockStep from '@pages/time-table/components/onboard/click-block-step';
import EditTimeTableStep from '@pages/time-table/components/onboard/edit-timetable-step';
import FestivalCustomStep from '@pages/time-table/components/onboard/festival-custom-step';
import FestivalSelectStep from '@pages/time-table/components/onboard/festival-select-step';
import IntroStep from '@pages/time-table/components/onboard/intro-step';
import SaveTimeTableStep from '@pages/time-table/components/onboard/save-timetable-step';

import { useFunnel } from '@shared/hooks/use-funnel';
import { routePath } from '@shared/router/path';

const TimeTableOnboard = () => {
  const navigate = useNavigate();
  const TOTAL_STEPS = 6;
  const TOTAL_INDEX = 5;
  const { Funnel, Step, setStep } = useFunnel(
    TOTAL_STEPS,
    routePath.TIME_TABLE_OUTLET,
  );
  const handleNextStep = (nextStep: number) => () => {
    setStep(nextStep);
  };
  const handleNavigate = ({ isReTry }: { isReTry: boolean }) => {
    if (isReTry) {
      setStep(1);
    } else {
      navigate(routePath.ADD_FESTIVAL);
    }
  };

  return (
    <Funnel>
      <Step name="1">
        <IntroStep
          handleNextStep={handleNextStep(1)}
          handleNavigate={handleNavigate}
        />
      </Step>
      <Step name="2">
        <FestivalSelectStep
          handleNextStep={handleNextStep(1)}
          handleNavigate={handleNavigate}
          totalIndex={TOTAL_INDEX}
          currentIndex={0}
        />
      </Step>
      <Step name="3">
        <FestivalCustomStep
          handleNextStep={handleNextStep(1)}
          handleNavigate={handleNavigate}
          totalIndex={TOTAL_INDEX}
          currentIndex={1}
        />
      </Step>
      <Step name="4">
        <EditTimeTableStep
          handleNextStep={handleNextStep(1)}
          handleNavigate={handleNavigate}
          totalIndex={TOTAL_INDEX}
          currentIndex={2}
        />
      </Step>
      <Step name="5">
        <ClickBlockStep
          handleNextStep={handleNextStep(1)}
          handleNavigate={handleNavigate}
          totalIndex={TOTAL_INDEX}
          currentIndex={3}
        />
      </Step>
      <Step name="6">
        <SaveTimeTableStep
          handleNavigate={handleNavigate}
          totalIndex={TOTAL_INDEX}
          currentIndex={4}
        />
      </Step>
    </Funnel>
  );
};

export default TimeTableOnboard;
