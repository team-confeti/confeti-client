import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '../../../icons';

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
}

export const Logo: Story = {
  args: {
    width: 150,
    height: 150,
  },
  render: (args: DefaultArgs) => (
    <div className={styles.container}>
      <div>
        <p className={styles.logoText}>LogoSymbol</p>
        <Icon name="logo-symbol" {...args} />
      </div>

      <div>
        <p className={styles.logoText}>LogoFooter</p>
        <Icon name="logo-footer" {...args} />
      </div>

      <div>
        <p className={styles.logoText}>Logo</p>
        <Icon name="logo-big" {...args} />
      </div>
    </div>
  ),
};
