import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@confeti/design-system/styles';

export const festivalArtistTitle = style({
  ...themeVars.display.flexAlignCenter,
  padding: '2rem 2rem 0rem 2rem',
});

export const festivalContentContainer = style({
  ...themeVars.display.flexColumn,
  alignItems: 'flex-start',
  padding: '1.6rem 2rem 2rem 2rem',
});

export const festivalContentItems = style({
  ...themeVars.display.flexColumn,
  width: '100%',
  alignItems: 'flex-start',
  gap: '2rem',
});

export const festivalDayBadge = style({
  ...themeVars.fontStyles.subtitle5_sb_12,
  ...themeVars.display.flexJustifyAlignCenter,
  color: themeVars.color.black,
  backgroundColor: themeVars.color.gray200,
  width: '100%',
  maxWidth: '5rem',
  padding: '0.4rem 0.8rem',
  borderRadius: '1.3rem',
  marginTop: '2rem',
});

export const artistGridVariants = recipe({
  base: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1.6rem',
    overflow: 'hidden',
    transition: 'max-height 0.4s ease',
  },
  variants: {
    expanded: {
      true: {
        maxHeight: '100rem',
      },
      false: {
        maxHeight: '10.5rem',
      },
    },
  },
});

export const festivalArtistContainer = style({
  ...themeVars.display.flexColumn,
  alignItems: 'center',
  height: '100%',
  gap: '1.2rem',
});

export const festivalArtistName = style({
  ...themeVars.fontStyles.body4_m_13,
  color: themeVars.color.black,
  width: '100%',
  height: '1.5rem',
  overflow: 'hidden',
  textAlign: 'center',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const festivalMorebutton = style({
  width: '100%',
});
