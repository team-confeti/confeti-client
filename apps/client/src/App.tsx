import { BrowserRouter } from 'react-router-dom';
import { init } from '@amplitude/analytics-browser';
import * as Sentry from '@sentry/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import {
  OverlayProvider,
  ThemeProvider,
  ToastContainer,
} from '@confeti/design-system';
import { rootStyle } from '@confeti/design-system/styles';
import Router from '@shared/router/router';

import { queryClient } from './shared/utils/query-client';

init(import.meta.env.VITE_AMPLITUDE_API_KEY);
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  tracePropagationTargets: ['localhost', /^https:\/\/confeti\.co\.kr/],
  tracesSampleRate: 1.0,
  normalizeDepth: 6,
});
Sentry.addIntegration(Sentry.browserTracingIntegration());

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <div className={rootStyle}>
            <OverlayProvider>
              <Router />
              <ToastContainer />
            </OverlayProvider>
          </div>
        </ThemeProvider>
      </BrowserRouter>
      <div style={{ fontSize: '16px' }}>
        <ReactQueryDevtools initialIsOpen={false} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
