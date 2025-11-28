import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@confeti/design-system/styles';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '2rem',
  padding: '2rem',
  flex: 1,
  overflowY: 'auto',
});

export const selectedArtistItem = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxHeight: '3rem',
});

export const selectedArtistItemContent = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.5rem',
});

export const artistName = style({
  display: 'webkit-box',
  overflow: 'hidden',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',

  ...themeVars.fontStyles.body2_r_15,
  color: themeVars.color.black,
});

export const checkbox = recipe({
  base: {
    display: 'flex',
    width: '2.4rem',
    height: '2.4rem',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    aspectRatio: '1/1',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
  },
  variants: {
    checked: {
      true: {
        border: 'none',
        background: '#B5F602',
      },
      false: {
        border: '1px solid #C5C6CB',
        background: '#F9FAFE',
      },
    },
  },
  defaultVariants: {
    checked: false,
  },
});

export const confirmButtonWrapper = style({
  display: 'flex',
  padding: '2rem',
  width: '100%',
  position: 'sticky',
  bottom: 0,
  background:
    'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 100%)',
});
