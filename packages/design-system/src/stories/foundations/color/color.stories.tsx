import type { Meta, StoryObj } from '@storybook/react';

import { color as colors } from '../../../styles/tokens/color';

import * as styles from './color.css';

const meta: Meta = {
  title: 'Foundations/Color',
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

type ColorTokens = {
  white: string;
  gray100: string;
  gray200: string;
  gray300: string;
  gray400: string;
  gray500: string;
  gray600: string;
  gray700: string;
  gray800: string;
  gray900: string;
  black: string;
  confeti_lime: string;
  confeti_lime2: string;
  confeti_lime3: string;
  confeti_red: string;
  black_op: string;
  confeti_grad: string;
  confeti_grad2: string;
  confeti_purple_grad: string;
};

const ColorGroup = ({
  title,
  colors,
}: {
  title: string;
  colors: Record<string, string>;
}) => (
  <div className={styles.colorGroup}>
    <h3 className={styles.groupTitle}>{title}</h3>
    <div className={styles.layout}>
      {Object.entries(colors).map(([name, value]) => (
        <div key={name} className={styles.colorBox}>
          <div
            className={styles.color}
            style={{ background: value }}
            title={value}
          />
          <div className={styles.name}>{name}</div>
          <div className={styles.meta}>{value}</div>
        </div>
      ))}
    </div>
  </div>
);

export const Color: Story = {
  render: () => (
    <div>
      <ColorGroup title="Gray Scale" colors={pickGrayScaleColors(colors)} />
      <ColorGroup title="Primary Color" colors={pickPrimaryColor(colors)} />
      <ColorGroup
        title="Secondary Colors"
        colors={pickSecondaryColors(colors)}
      />
      <ColorGroup title="Opacity" colors={pickOpacityColors(colors)} />
      <ColorGroup title="Gradients" colors={pickGradients(colors)} />
    </div>
  ),

  decorators: [
    (Story) => (
      <div style={{ padding: '3rem' }}>
        <Story />
      </div>
    ),
  ],
};

const pickGrayScaleColors = (colors: ColorTokens) => ({
  white: colors.white,
  gray100: colors.gray100,
  gray200: colors.gray200,
  gray300: colors.gray300,
  gray400: colors.gray400,
  gray500: colors.gray500,
  gray600: colors.gray600,
  gray700: colors.gray700,
  gray800: colors.gray800,
  gray900: colors.gray900,
  black: colors.black,
});

const pickPrimaryColor = (colors: ColorTokens) => ({
  confeti_lime: colors.confeti_lime,
});

const pickSecondaryColors = (colors: ColorTokens) => ({
  confeti_lime2: colors.confeti_lime2,
  confeti_lime3: colors.confeti_lime3,
  confeti_red: colors.confeti_red,
});

const pickOpacityColors = (colors: ColorTokens) => ({
  black_op: colors.black_op,
});

const pickGradients = (colors: ColorTokens) => ({
  confeti_grad: colors.confeti_grad,
  confeti_grad2: colors.confeti_grad2,
  confeti_purple_grad: colors.confeti_purple_grad,
});
