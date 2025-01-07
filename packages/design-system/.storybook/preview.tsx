import type { Preview } from '@storybook/react';
import '../src/styles/reset.css';
import { themeClass } from '../src/styles/theme.css';
import React from 'react';
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
    decorators: [
      (Story) => (
        <div className={themeClass}>
          <Story />
        </div>
      ),
    ],
  },
};

export default preview;
