import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Preview } from '@storybook/react';
import { themeClass } from '../src/styles/theme.css';

import '../src/styles/reset.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      element: '#root',
      manual: false,
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className={themeClass}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default preview;
