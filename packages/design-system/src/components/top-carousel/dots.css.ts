import { globalStyle } from '@vanilla-extract/css';

globalStyle('.dots_custom', {
  display: 'flex',
  justifyContent: 'center',
  verticalAlign: 'middle',
  margin: 0,
  paddingTop: '0rem',
  paddingBottom: '1.6rem',
});

globalStyle('.dots_custom li', {
  listStyle: 'none',
  cursor: 'pointer',
  display: 'inline-block',
  marginRight: '8px',
  padding: 0,
});

globalStyle('.dots_custom li button', {
  border: 'none',
  background: '#ffffff',
  opacity: 0.2,
  cursor: 'pointer',
  display: 'block',
  height: '6px',
  width: '6px',
  borderRadius: '100%',
  padding: 0,
  content: "''",
  color: 'transparent',
});

globalStyle('.dots_custom li.slick-active button', {
  backgroundColor: '#92c015',
  opacity: 1,
});
