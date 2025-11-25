import TimetableDetail from '@pages/my/page/timetable-detail/timetable-detail';
import TimeTablePage from '@pages/timetable/page/timetable-page';

import { OnboardingPage } from '../lazy';
import { createOnboardingGuard } from '../onboarding-guard';
import { createProtectedRoute } from '../protected-route';

export const onboardingRoute = {
  element: createOnboardingGuard(<OnboardingPage />),
};

export const timetableMainRoute = {
  element: createProtectedRoute(true, <TimeTablePage />),
};

export const myTimetableDetailRoute = {
  element: createProtectedRoute(true, <TimetableDetail />),
};
