import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const wrapper = style({
  display: 'flex',
  padding: '2rem 2rem 3rem 2rem',
  gap: '4rem',
});

export const item = style({
  position: 'relative',
  width: '100%',
  ...themeVars.display.flexColumn,
  alignItems: 'center',
  gap: '0.9rem',

  selectors: {
    '&::after': {
      content: '',
      position: 'absolute',
      top: '50%',
      right: 0,
      transform: 'translateY(-50%)',
      width: '1.5px',
      height: '3rem',
      backgroundColor: themeVars.color.gray300,
      borderRadius: '2px',
      marginRight: '-2.2rem',
    },
    '&:last-child::after': {
      content: 'none',
    },
  },
});

export const highlightedTitle = style({
  ...themeVars.fontStyles.subtitle5_sb_12,
  color: themeVars.color.confeti_lime3,
});

export const title = style({
  ...themeVars.fontStyles.subtitle5_sb_12,
  color: themeVars.color.gray600,
});

export const count = style({
  ...themeVars.fontStyles.subtitle2_sb_16,
});
