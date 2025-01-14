import React from 'react';
import type { Preview } from '@storybook/react';

import '../src/styles/reset.css';
import { themeClass } from '../src/styles/theme.css';

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
      <div style={{ width: '375px' }} className={themeClass}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
