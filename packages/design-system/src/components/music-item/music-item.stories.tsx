import type { Meta, StoryObj } from '@storybook/react';

import MusicItem from './music-item';

const meta: Meta<typeof MusicItem> = {
  title: 'Common/MusicItem',
  component: MusicItem,
  tags: ['autodocs'],
  args: {
    albumImage:
      'https://i.namu.wiki/i/BVw93XsFK1SXOYnUorI0lgpscl-wdhzKYkNcPHouF_cc27nSZFTdw0-iiH43RMr_sIJxIcC3_pIlLAO_8KJ2fg.webp',
    title: '새벽별',
    artist: 'TOUCHED',
  },
  argTypes: {
    onClickPlayToggle: { table: { disable: true } },
    onClickDelete: { table: { disable: true } },
    dragHandleProps: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof MusicItem>;

export const Default: Story = {
  args: {
    variant: 'default',
    isPlaying: false,
  },
};

export const Playing: Story = {
  args: {
    variant: 'default',
    isPlaying: true,
  },
};

export const Editable: Story = {
  args: {
    variant: 'editable',
  },
};

export const ConfirmDelete: Story = {
  args: {
    variant: 'confirmDelete',
  },
};
