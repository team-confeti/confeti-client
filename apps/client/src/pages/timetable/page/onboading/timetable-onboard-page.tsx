import { useNavigate } from 'react-router-dom';

import { useFunnel } from '@shared/hooks/use-funnel';
import { routePath } from '@shared/router/path';

import ClickBlockStep from '@pages/timetable/components/onboard/click-block-step';
import EditTimetableStep from '@pages/timetable/components/onboard/edit-timetable-step';
import FestivalCustomStep from '@pages/timetable/components/onboard/festival-custom-step';
import FestivalSelectStep from '@pages/timetable/components/onboard/festival-select-step';
import IntroStep from '@pages/timetable/components/onboard/intro-step';
import SaveTimetableStep from '@pages/timetable/components/onboard/save-timetable-step';
import { useImagePreload } from '@pages/timetable/hooks/use-image-preload';

import ImgOnboard1 from '/images/img_onboard_1.webp';
import ImgOnboard2 from '/images/img_onboard_2.webp';
import ImgOnboard3 from '/images/img_onboard_3.webp';
import ImgOnboard4 from '/images/img_onboard_4.webp';
import ImgOnboard5 from '/images/img_onboard_5.webp';
import ImgOnboard6 from '/images/img_onboard_6.webp';

const onboardImages = [
  ImgOnboard1,
  ImgOnboard2,
  ImgOnboard3,
  ImgOnboard4,
  ImgOnboard5,
  ImgOnboard6,
];

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
  useImagePreload(onboardImages);

  return (
    <Funnel>
      <Step name="1">
        <IntroStep
          handleNextStep={handleNextStep(1)}
          handleNavigate={handleNavigate}
          onboardImage={ImgOnboard1}
        />
      </Step>
      <Step name="2">
        <FestivalSelectStep
          handleNextStep={handleNextStep(1)}
          handleNavigate={handleNavigate}
          totalIndex={TOTAL_INDEX}
          currentIndex={0}
          onboardImage={ImgOnboard2}
        />
      </Step>
      <Step name="3">
        <FestivalCustomStep
          handleNextStep={handleNextStep(1)}
          handleNavigate={handleNavigate}
          totalIndex={TOTAL_INDEX}
          currentIndex={1}
          onboardImage={ImgOnboard3}
        />
      </Step>
      <Step name="4">
        <EditTimetableStep
          handleNextStep={handleNextStep(1)}
          handleNavigate={handleNavigate}
          totalIndex={TOTAL_INDEX}
          currentIndex={2}
          onboardImage={ImgOnboard4}
        />
      </Step>
      <Step name="5">
        <ClickBlockStep
          handleNextStep={handleNextStep(1)}
          handleNavigate={handleNavigate}
          totalIndex={TOTAL_INDEX}
          currentIndex={3}
          onboardImage={ImgOnboard5}
        />
      </Step>
      <Step name="6">
        <SaveTimetableStep
          handleNavigate={handleNavigate}
          totalIndex={TOTAL_INDEX}
          currentIndex={4}
          onboardImage={ImgOnboard6}
        />
      </Step>
    </Funnel>
  );
};

export default TimetableOnboard;
