import { style } from '@vanilla-extract/css';
import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  ...themeVars.display.flexColumn,
  width: '100%',
  height: '100%',
  alignItems: 'center',
  gap: '11.8rem',
  padding: '6.4rem 2.5rem 5.6rem 2.5rem',
});

export const Logo = style({});

export const bottomSection = style({});

export const loginButton = style({});

export const description = style({});

export const atagText = style({});
