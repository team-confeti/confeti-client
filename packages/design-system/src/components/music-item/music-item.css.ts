import { style } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

export const musicItemWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1.6rem',
  padding: '1rem 2rem',
});

export const albumCoverWrapper = style({
  position: 'relative',
  width: '6.8rem',
  height: '6.8rem',
});

export const albumCover = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '0.5rem',
});

export const albumOverlay = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '0.5rem',
});

export const minusBtn = style({
  backgroundColor: 'transparent',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const textSection = style({
  flexGrow: 1,
  overflow: 'hidden',
});

export const title = style({
  ...themeVars.fontStyles.title4_b_16,
  color: themeVars.color.gray800,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: '0.4rem',
});

export const artist = style({
  ...themeVars.fontStyles.body4_m_13,
  color: themeVars.color.gray600,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});

export const rightIcon = style({
  marginLeft: 'auto',
});
