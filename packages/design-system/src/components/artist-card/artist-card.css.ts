import { recipe } from '@vanilla-extract/recipes';
import { themeVars } from '../../styles';
import { style } from '@vanilla-extract/css';

export const artistCardVariants = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
    gap: '1.2rem',
    cursor: 'pointer',
  },
  variants: {
    size: {
      myArtist: { width: '9rem' },
      myArtistAll: { width: '8rem' },
      detailArtist: { width: '7rem' },
    },
  },
});

export const artistImg = recipe({
  base: {
    borderRadius: '50%',
  },
  variants: {
    size: {
      myArtist: {
        width: '9rem',
        height: '9rem',
      },
      myArtistAll: {
        width: '8rem',
        height: '8rem',
      },
      detailArtist: {
        width: '7rem',
        height: '7rem',
      },
    },
  },
});

export const heartImg = style({
  position: 'absolute',
  top: '5.6rem',
  right: '0.05rem',
});

export const artistName = recipe({
  base: {
    width: '100%',
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    whiteSpace: 'normal',
    wordBreak: 'keep-all',
    color: themeVars.color.black,
  },
  variants: {
    size: {
      myArtist: [themeVars.fontStyles.body3_m_14],
      myArtistAll: [themeVars.fontStyles.body2_m_15],
      detailArtist: [themeVars.fontStyles.body4_m_13],
    },
  },
});
