import type { Meta, StoryObj } from '@storybook/react';
import InfoButton from './info-button';

const meta: Meta<typeof InfoButton> = {
  title: 'Common/Ticketing/InfoButton',
  component: InfoButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    title: '',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Medium: Story = {
  args: {
    size: 'md',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '17.6rem', backgroundColor: 'black' }}>
        <Story />
      </div>
    ),
  ],
};
