import * as Sentry from '@sentry/react';

import { OnboardingPage } from '../lazy';
import { createOnboardingGuard } from '../onboarding-guard';
import { routePath } from '../path';

export const layoutFreeRoutes = [
  {
    path: routePath.ONBOARDING,
    element: (
      <Sentry.ErrorBoundary fallback={<OnboardingPage />}>
        {createOnboardingGuard(<OnboardingPage />)}
      </Sentry.ErrorBoundary>
    ),
  },
];
