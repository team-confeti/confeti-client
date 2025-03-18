import type { Meta, StoryObj } from '@storybook/react';

import { LogoFooter, LogoMain, LogoSymbol } from '../../../icons/src';

import * as styles from './logo.css';

const meta: Meta = {
  title: 'Foundations/Logo',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

interface DefaultArgs {
  width?: number;
  height?: number;
  backgroundColor?: string;
  color?: string;
}

export const Logo: Story = {
  args: {
    width: 150,
    height: 150,
  },
  render: (args: DefaultArgs) => (
    <div className={styles.container}>
      <div>
        <p className={styles.logoText}>LogoMain</p>
        <LogoMain {...args} />
      </div>

      <div>
        <p className={styles.logoText}>LogoFooter</p>
        <LogoFooter {...args} />
      </div>

      <div>
        <p className={styles.logoText}>LogoSymbol</p>
        <LogoSymbol {...args} />
      </div>
    </div>
  ),
};
