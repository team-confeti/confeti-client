import * as Sentry from '@sentry/react';

import ErrorFallback from '@shared/pages/error/error';

import { OnboardingPage } from '../lazy';
import { createOnboardingGuard } from '../onboarding-guard';
import { routePath } from '../path';

export const layoutFreeRoutes = [
  {
    path: routePath.ONBOARDING,
    element: (
      <Sentry.ErrorBoundary fallback={ErrorFallback}>
        {createOnboardingGuard(<OnboardingPage />)}
      </Sentry.ErrorBoundary>
    ),
  },
];
