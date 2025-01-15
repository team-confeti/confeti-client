import { globalStyle, keyframes } from '@vanilla-extract/css';

export const fadeInOut = keyframes({
  '0%': { opacity: 0 },
  '50%': { opacity: 0.5 },
  '100%': { opacity: 1 },
});

globalStyle('.banner-title', {
  marginTop: '3rem',
  height: '10.3rem',
});

globalStyle('.title-date', {
  color: 'var(--grayscale-white, #fff)',
  textAlign: 'center',
  marginBottom: '1.2rem',
  fontSize: '1.2rem',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '140%', // 16.8px
  animation: `${fadeInOut} 1s ease-out forwards`,
});

globalStyle('.title-name', {
  color: 'var(--grayscale-white, #fff)',
  textAlign: 'center',
  marginBottom: '4px',
  fontSize: '2.4rem',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: 'normal',
  animation: `${fadeInOut} 1s ease-out forwards`,
});

globalStyle('.title-sub', {
  color: 'var(--grayscale-gray500, #93959d)',
  textAlign: 'center',
  fontSize: '1.4rem',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: 'normal',
  animation: `${fadeInOut} 1s ease-out forwards`,
});

globalStyle('.card', {
  zIndex: 1,
  width: '19.7rem',
  height: '26.2rem',
  borderRadius: '10px',
  boxShadow: '0px 3px 6px 1px rgba(0, 0, 0, 0.25)',
});
