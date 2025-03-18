import type { Meta, StoryObj } from '@storybook/react';

import { fontStyles } from '../../../styles/tokens/font-styles';

const meta: Meta = {
  title: 'Foundations/Typography',
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const typographyExamples = [
  { name: 'title1_b_24', style: { ...fontStyles.title1_b_24, color: '#333' } },
  { name: 'title2_b_20', style: { ...fontStyles.title2_b_20, color: '#333' } },
  { name: 'title3_b_18', style: { ...fontStyles.title3_b_18, color: '#333' } },
  { name: 'title4_b_16', style: { ...fontStyles.title4_b_16, color: '#333' } },
  { name: 'title5_b_15', style: { ...fontStyles.title5_b_15, color: '#333' } },
  {
    name: 'subtitle1_m_18',
    style: { ...fontStyles.subtitle1_m_18, color: '#333' },
  },
  {
    name: 'subtitle2_sb_16',
    style: { ...fontStyles.subtitle2_sb_16, color: '#333' },
  },
  {
    name: 'subtitle3_b_15',
    style: { ...fontStyles.subtitle3_b_15, color: '#333' },
  },
  {
    name: 'subtitle4_b_14',
    style: { ...fontStyles.subtitle4_b_14, color: '#333' },
  },
  { name: 'body1_r_16', style: { ...fontStyles.body1_r_16, color: '#333' } },
  { name: 'body2_m_15', style: { ...fontStyles.body2_m_15, color: '#333' } },
  { name: 'body3_r_14', style: { ...fontStyles.body3_r_14, color: '#333' } },
  { name: 'body4_m_13', style: { ...fontStyles.body4_m_13, color: '#333' } },
  { name: 'body5_r_12', style: { ...fontStyles.body5_r_12, color: '#333' } },
  {
    name: 'caption_b_10',
    style: { ...fontStyles.caption_b_10, color: '#333' },
  },
  {
    name: 'caption_r_10',
    style: { ...fontStyles.caption_r_10, color: '#333' },
  },
];

export const Typography: Story = {
  render: (args) => (
    <div>
      {typographyExamples.map((example) => (
        <div
          key={example.name}
          style={{ ...example.style, marginBottom: '2rem' }}
        >
          <h3>{example.name}</h3>
          <p>This is a sample text using the {example.name} style.</p>
        </div>
      ))}
    </div>
  ),
};
