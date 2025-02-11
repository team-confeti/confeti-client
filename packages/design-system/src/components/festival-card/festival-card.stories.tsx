import { Meta, StoryObj } from '@storybook/react';
import FestivalCard from './festival-card';

const meta: Meta<typeof FestivalCard> = {
  title: 'Common/Card/FestivalCard',
  component: FestivalCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    imageSrc: { control: 'text' },
    isSelected: { control: 'boolean' },
    selectable: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof FestivalCard>;

export const Default: Story = {
  args: {
    title: '오로라 내한 공연',
    imageSrc: 'https://i.imgur.com/DwH8XUo.png',
  },
  render: (args) => (
    <div style={{ width: '10rem', height: '14rem' }}>
      <FestivalCard {...args} />
    </div>
  ),
};

export const Selectable: Story = {
  args: {
    title: '오로라 내한 공연',
    imageSrc: 'https://i.imgur.com/DwH8XUo.png',
    selectable: true,
  },
  render: (args) => (
    <div style={{ width: '10rem', height: '14rem' }}>
      <FestivalCard {...args} />
    </div>
  ),
};

export const Preselected: Story = {
  args: {
    title: '오로라 내한 공연',
    imageSrc: 'https://i.imgur.com/DwH8XUo.png',
    selectable: true,
    isSelected: true,
  },
  render: (args) => (
    <div style={{ width: '10rem', height: '14rem' }}>
      <FestivalCard {...args} />
    </div>
  ),
};
