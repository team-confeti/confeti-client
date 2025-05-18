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
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '2.4rem',
});

export const artistItem = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.8rem',
});

export const artistName = style({
  ...themeVars.fontStyles.body4_m_13,
  color: themeVars.color.black,
  overflow: 'hidden',
  textAlign: 'center',
  textOverflow: 'ellipsis',
});
