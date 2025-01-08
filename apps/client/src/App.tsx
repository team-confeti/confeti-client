import { Button, ThemeProvider } from '@confeti/design-system';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './shared/utils/query-client';

// ci-cd test 2
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <main>
          <h1>Confeti</h1>
          <Button>Click me</Button>
        </main>
      </ThemeProvider>
      <div style={{ fontSize: '16px' }}>
        <ReactQueryDevtools initialIsOpen={false} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
