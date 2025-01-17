import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const itemsWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: 'calc(0.7rem + var(--top))',

  left: 'calc( 3.1rem + ((100% - 3.1rem) / var(--stage-count) * var(--stage-order)))',
  backgroundColor: themeVars.color.confeti_lime,
  color: themeVars.color.black,
  height: 'var(--diff)',
  width: 'calc((100% - 3.1rem) / var(--stage-count))',
  padding: '0.8rem 0rem',
  borderRadius: '2px',
  zIndex: '3',
  cursor: 'pointer',
});
