import { globalStyle, style } from '@vanilla-extract/css';

/* CSS Variables */
globalStyle(':root', {
  vars: {
    '--min-width': '375px',
    '--max-width': '375px',
    '--height': '667px',
  },
});

/* HTML & Body Styles */
globalStyle('html, body', {
  fontSize: '62.5%',
  scrollbarWidth: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  scrollBehavior: 'smooth',
  background: '#f8f9fa',
  height: '100vh',
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
      boxShadow: '0 0 1px rgba(0, 0, 0, 0.4)',
    },
  },
});
