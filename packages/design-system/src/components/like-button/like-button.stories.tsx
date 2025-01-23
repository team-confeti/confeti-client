import type { Meta, StoryObj } from '@storybook/react';
import LikeButton from './like-button';

const meta: Meta<typeof LikeButton> = {
  title: 'Common/LikeButton',
  component: LikeButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    isFavorite: false,
    onLikeToggle: (action) => console.log(action),
    className: '',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Liked: Story = {
  args: {
    isFavorite: true,
  },
};

export const Unliked: Story = {
  args: {
    isFavorite: false,
  },
};
