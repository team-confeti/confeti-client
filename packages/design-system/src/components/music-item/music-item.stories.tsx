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

const wrapperStyle = {
  maxWidth: '375px',
  margin: '0 auto',
};

export const Default: Story = {
  args: {
    variant: 'default',
    isPlaying: false,
  },
  render: (args) => (
    <div style={wrapperStyle}>
      <MusicItem {...args} />
    </div>
  ),
};

export const Playing: Story = {
  args: {
    variant: 'default',
    isPlaying: true,
  },
  render: (args) => (
    <div style={wrapperStyle}>
      <MusicItem {...args} />
    </div>
  ),
};

export const Editable: Story = {
  args: {
    variant: 'editable',
  },
  render: (args) => (
    <div style={wrapperStyle}>
      <MusicItem {...args} />
    </div>
  ),
};

export const ConfirmDelete: Story = {
  args: {
    variant: 'confirmDelete',
  },
  render: (args) => (
    <div style={wrapperStyle}>
      <MusicItem {...args} />
    </div>
  ),
};
