import type { Meta, StoryObj } from '@storybook/react';
import FloatingButton from './floating-button';
const meta: Meta<typeof FloatingButton> = {
  title: 'Common/FloatingButton',
  component: FloatingButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        background: '#f0f0f0',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '430px',
          height: '100%',
          background: '#ffffff',
        }}
      >
        <FloatingButton />,
      </div>
    </div>
  ),
};
