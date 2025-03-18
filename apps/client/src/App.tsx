import { BrowserRouter } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ThemeProvider, ToastContainer } from '@confeti/design-system';
import { rootStyle } from '@confeti/design-system/styles';
import Router from '@shared/router/router';

import { queryClient } from './shared/utils/query-client';

function App() {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    tracePropagationTargets: ['localhost', /^https:\/\/confeti\.co\.kr/],
    tracesSampleRate: 1.0,
    normalizeDepth: 6,
  });
  Sentry.addIntegration(Sentry.browserTracingIntegration());

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <div className={rootStyle}>
            <Router />
            <ToastContainer />
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
