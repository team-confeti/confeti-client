import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { isNative } from '@confeti/platform';

import App from './App';

if (isNative()) {
  document.documentElement.classList.add('cap-native');
}

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  console.error('Failed to find the root element.');
}
