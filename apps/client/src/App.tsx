import { ThemeProvider } from '@confeti/design-system';
import Router from '@shared/router/router';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
