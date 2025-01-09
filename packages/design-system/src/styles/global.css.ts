import { globalStyle, style } from '@vanilla-extract/css';

/* CSS Variables */
globalStyle(':root', {
  vars: {
    '--min-width': '375px',
    '--max-width': '430px',
    '--height': '100vh',
  },
});

/* HTML & Body Styles */
globalStyle('html, body', {
  fontSize: '62.5%',
  fontFamily: '"Pretendard", sans-serif',
  scrollbarWidth: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  scrollBehavior: 'smooth',
  background: '#f8f9fa',
  margin: '0',
  padding: '0',
});

/* Scrollbar Hide */
globalStyle('::-webkit-scrollbar', {
  display: 'none',
});

/* Root Container */
export const rootStyle = style({
  minWidth: 'var(--min-width)',
  maxWidth: 'var(--max-width)',
  minHeight: 'var(--height)',
  width: '100%',
  backgroundColor: '#fff',
  margin: 'var(--margin) auto',

  '@media': {
    '(min-width: 430px)': {
      width: '430px',
    },
    '(max-width: 375px)': {
      width: '100%',
    },
  },
});
