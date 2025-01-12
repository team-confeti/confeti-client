import { style, styleVariants } from '@vanilla-extract/css';
import { themeVars } from '../../styles';

const baseContainer = style({
  display: 'flex',
  alignItems: 'center',
  height: '5rem',
  backgroundColor: themeVars.color.white,
});

export const container = styleVariants({
  default: [
    baseContainer,
    {
      justifyContent: 'space-between',
      padding: '0.8rem 2rem',
    },
  ],
  detail: [
    baseContainer,
    {
      justifyContent: 'flex-start',
      padding: '1.2rem 0 1.2rem 2rem',
      borderBottom: `1px solid ${themeVars.color.gray300}`,
    },
  ],
});

export const logo = style({
  width: '9.7059rem',
  height: '100%',
});

export const iconSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
});

const baseButton = style({
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
});

export const button = styleVariants({
  default: [
    baseButton,
    {
      width: '2.4rem',
      height: '2.4rem',
    },
  ],
  back: [
    baseButton,
    {
      width: '2rem',
      height: '2rem',
    },
  ],
});

export const icon = style({
  width: '100%',
  height: '100%',
});

export const title = style([
  themeVars.fontStyles.title4_b_16,
  {
    color: themeVars.color.black,
    textAlign: 'center',
    flex: 1,
  },
]);

export const spacer = style({
  width: '2rem',
});
