import { useNavigate } from 'react-router-dom';

import { useFunnel } from '@shared/hooks/use-funnel';
import { routePath } from '@shared/router/path';

import ClickBlockStep from '@pages/timetable/components/onboard/click-block-step';
import EditTimetableStep from '@pages/timetable/components/onboard/edit-timetable-step';
import FestivalCustomStep from '@pages/timetable/components/onboard/festival-custom-step';
import FestivalSelectStep from '@pages/timetable/components/onboard/festival-select-step';
import IntroStep from '@pages/timetable/components/onboard/intro-step';
import SaveTimetableStep from '@pages/timetable/components/onboard/save-timetable-step';

const TimetableOnboard = () => {
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
        <EditTimetableStep
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
        <SaveTimetableStep
          handleNavigate={handleNavigate}
          totalIndex={TOTAL_INDEX}
          currentIndex={4}
        />
      </Step>
    </Funnel>
  );
};

export default TimetableOnboard;
