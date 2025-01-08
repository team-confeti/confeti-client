import type { Meta, StoryObj } from '@storybook/react';

import type { ButtonHTMLAttributes } from 'react';
import Button from './button';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline';
  size?: 'xLarge' | 'large' | 'medium';
  isDisabled?: boolean;
}

const meta = {
  title: 'Common/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'tertiary', 'outline'],
    },
    size: {
      control: { type: 'radio' },
      options: ['xLarge', 'large', 'medium'],
    },
    children: {
      control: { type: 'text' },
    },
    isDisabled: {
      control: { type: 'boolean' },
    },
    color: {
      control: {
        type: 'color',
      },
    },
  },
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Button',
    isDisabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const createButtonStory = (variant: ButtonProps['variant']) => ({
  args: {
    variant,
  },
  argsType: {
    variant: {
      control: false,
    },
  },
});

export const Primary: Story = createButtonStory('primary');

export const Secondary: Story = createButtonStory('secondary');

export const Tertiary: Story = createButtonStory('tertiary');

export const Outline: Story = createButtonStory('outline');
