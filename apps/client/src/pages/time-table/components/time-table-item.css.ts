import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const itemsWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: '0.7rem',
  left: 'calc(3rem + ((100% - 3rem) / var(--stage-count) * var(--stage-id)))',
  backgroundColor: themeVars.color.confeti_lime,
  color: themeVars.color.black,
  height: 'var(--diff)',
  width: 'calc((100% - 3rem) / var(--stage-count))',
  padding: '0.8rem 0',
  borderRadius: '2px',
});
