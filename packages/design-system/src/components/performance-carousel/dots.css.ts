import { globalStyle } from '@vanilla-extract/css';
import { themeVars } from '../../styles';

globalStyle('.dots_custom', {
  display: 'flex',
  justifyContent: 'center',
  verticalAlign: 'middle',
  margin: 0,
  paddingTop: '0rem !important',
  paddingBottom: '0.1rem !important',
});

globalStyle('.dots_custom li', {
  listStyle: 'none',
  cursor: 'pointer',
  display: 'inline-block',
  marginRight: '0.8rem',
  padding: 0,
});

globalStyle('.dots_custom li button', {
  border: 'none',
  background: themeVars.color.white,
  opacity: 1,
  cursor: 'pointer',
  display: 'block',
  height: '0.6rem',
  width: '0.6rem',
  borderRadius: '100%',
  padding: 0,
  color: 'transparent',
});

globalStyle('.dots_custom li.slick-active button', {
  backgroundColor: themeVars.color.confeti_lime,
  opacity: 1,
  width: '2.4rem',
  borderRadius: '10px',
});
