import { RouterProvider } from 'react-router-dom';

import { ThemeProvider } from '@confeti/design-system';
import router from '@shared/router/router';

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
