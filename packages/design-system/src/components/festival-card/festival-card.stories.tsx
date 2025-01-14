import { Meta, StoryObj } from '@storybook/react';
import FestivalCard from './festival-card';

const meta: Meta<typeof FestivalCard> = {
  title: 'Common/FestivalCard',
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
    title: '2024 위버스 콘 페스티벌',
    imageSrc: 'https://dummyimage.com/100x142',
  },
};

export const Selectable: Story = {
  args: {
    title: '2024 위버스 콘 페스티벌',
    imageSrc: 'https://dummyimage.com/100x142',
    selectable: true,
  },
};

export const Preselected: Story = {
  args: {
    title: '2024 위버스 콘 페스티벌',
    imageSrc: 'https://dummyimage.com/100x142',
    selectable: true,
    isSelected: true,
  },
};
