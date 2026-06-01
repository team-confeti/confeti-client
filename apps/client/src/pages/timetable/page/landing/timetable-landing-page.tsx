import { useState } from 'react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { LogShowEvent } from '@shared/analytics/logging';
import { FESTIVAL_TIMETABLE_QUERY_OPTIONS } from '@shared/apis/timetable/festival-timetable-queries';
import { isEmpty } from '@shared/lib/es-toolkit/es';
import { routePath } from '@shared/router/path';

import TimetableLandingContent from './components/timetable-landing-content';
import TimetableLandingHeader from './components/timetable-landing-header';

import * as styles from './timetable-landing.css';

const TimetableLandingPage = () => {
  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);

  const { data } = useSuspenseInfiniteQuery(
    FESTIVAL_TIMETABLE_QUERY_OPTIONS.ADDABLE_FESTIVALS(),
  );

  const handleCreateTimetable = () => {
    if (isEmpty(data.pages.flatMap((page) => page.festivals))) {
      navigate(routePath.NO_UPCOMING_FESTIVAL);
      return;
    }
    navigate(routePath.ADD_FESTIVAL);
  };

  return (
    <div className={styles.landingWrapper}>
      <LogShowEvent name="show_timetable_landing" />
      <TimetableLandingHeader
        onCreateTimetable={handleCreateTimetable}
        isEditMode={isEditMode}
      />

      <div className={styles.contentArea}>
        <TimetableLandingContent
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
        />
      </div>
    </div>
  );
};

export default TimetableLandingPage;
