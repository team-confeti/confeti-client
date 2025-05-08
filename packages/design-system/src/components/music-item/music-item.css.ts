import { style } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

export const musicItemWrapper = style({
  ...themeVars.display.flexBetweenAlignCenter,
  gap: '1.6rem',
  padding: '1rem 0',
  // touchAction: 'none',
});

export const contentWrapper = style({
  ...themeVars.display.flexBetweenAlignCenter,
  gap: '1.6rem',
  flexGrow: 1,
  cursor: 'pointer',
});

export const albumCoverWrapper = style({
  position: 'relative',
  width: '6.8rem',
  height: '6.8rem',
  flexShrink: 0,
});

export const albumCover = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '0.5rem',
});

export const albumOverlay = style({
  ...themeVars.display.flexJustifyAlignCenter,
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.5)',
  borderRadius: '0.5rem',
});

export const minusBtn = style({
  ...themeVars.display.flexJustifyAlignCenter,
  backgroundColor: 'transparent',
  border: 'none',
});

export const textSection = style({
  flexGrow: 1,
  overflow: 'hidden',
});

export const title = style({
  ...themeVars.fontStyles.title4_b_16,
  maxWidth: '21rem',
  width: '100%',
  color: themeVars.color.gray800,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: '0.4rem',
});

export const artist = style({
  ...themeVars.fontStyles.body4_m_13,
  color: themeVars.color.gray600,
  width: '100%',
  maxWidth: '21rem',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  lineHeight: '1.5rem',
});

export const rightIcon = style({
  marginLeft: 'auto',
});
