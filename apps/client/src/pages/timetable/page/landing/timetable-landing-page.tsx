import { useState } from 'react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { FESTIVAL_TIMETABLE_QUERY_OPTIONS } from '@shared/apis/timetable/festival-timetable-queries';
import { Footer, NavigationTabs } from '@shared/components';
import { routePath } from '@shared/router/path';

import { TAB_MENU } from '@pages/home/constants/tab';

import TimetableLandingContent from './components/timetable-landing-content';
import TimetableLandingHeader from './components/timetable-landing-header';

import * as styles from './timetable-landing.css';

const TimetableLandingPage = () => {
  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);

  const { data } = useSuspenseInfiniteQuery(
    FESTIVAL_TIMETABLE_QUERY_OPTIONS.ADDABLE_FESTIVALS(),
  );

  const hasAddableFestivals = (data.pages[0]?.festivals.length ?? 0) > 0;

  const handleCreateTimetable = () => {
    navigate(
      hasAddableFestivals
        ? routePath.ADD_FESTIVAL
        : routePath.NO_UPCOMING_FESTIVAL,
    );
  };

  return (
    <div className={styles.landingWrapper}>
      <TimetableLandingHeader
        onCreateTimetable={handleCreateTimetable}
        isEditMode={isEditMode}
      />

      <div className={styles.navTabsWrapper}>
        <NavigationTabs defaultActiveTab={TAB_MENU.TIMETABLE} />
      </div>

      <div className={styles.contentArea}>
        <TimetableLandingContent
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
        />
      </div>

      <Footer />
    </div>
  );
};

export default TimetableLandingPage;
