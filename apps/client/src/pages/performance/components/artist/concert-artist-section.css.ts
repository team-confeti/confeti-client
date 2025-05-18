import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@confeti/design-system/styles';

export const concertArtistContainer = style({
  ...themeVars.display.flexAlignCenter,
  padding: '2rem 2rem 5.6rem 2rem',
  gap: '1rem',
});

export const concertContent = recipe({
  base: {
    ...themeVars.display.flexColumn,
  },
  variants: {
    variants: {
      title: {
        alignItems: 'flex-start',
        gap: '1.7rem',
      },
    },
  },
});

export const ArtistTitle = style({
  ...themeVars.fontStyles.title3_b_18,
  color: themeVars.color.black,
});

export const artistListContainer = style({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '1.6rem',
});

export const artistItem = style({
  ...themeVars.display.flexColumn,
  alignItems: 'center',
  width: '100%',
  gap: '0.8rem',
});

export const artistName = style({
  ...themeVars.fontStyles.body4_m_13,
  color: themeVars.color.black,
  width: '100%',
  overflow: 'hidden',
  textAlign: 'center',
  textOverflow: 'ellipsis',
});
