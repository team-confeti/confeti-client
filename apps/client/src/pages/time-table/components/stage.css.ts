import { style } from '@vanilla-extract/css';
import { themeVars } from '@confeti/design-system/styles';

export const wrapper = style({
  ...themeVars.fontStyles.caption_r_10,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  width: '100%',
  height: '4rem',
  padding: '0 0.8rem',
  border: `1px solid ${themeVars.color.gray200}`,
  borderRadius: '2px',
});

export const stageWrapper = style({
  display: 'flex',
  gap: '0.2rem',
  paddingLeft: '3.1rem',
  marginBottom: '1.2rem',
  wordBreak: 'keep-all',
});
