import { globalStyle } from '@vanilla-extract/css';
import { themeVars } from '../../styles';

/* Slider */
globalStyle('.slick-slider', {
  ...themeVars.display.flexColumn,
  boxSizing: 'border-box',

  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
  userSelect: 'none',

  WebkitTouchCallout: 'none',
  msTouchAction: 'pan-y',
  touchAction: 'pan-y',
  WebkitTapHighlightColor: 'transparent',
});

globalStyle('.slick-list', {
  gap: '2rem',
  overflow: 'hidden',
  margin: '0',
});

globalStyle('.slick-list:focus', {
  outline: 'none',
});

globalStyle('.slick-list.dragging', {
  cursor: 'pointer',
});

globalStyle('.slick-slider .slick-track, .slick-slider .slick-list', {
  WebkitTransform: 'translate3d(0, 0, 0)',
  MozTransform: 'translate3d(0, 0, 0)',
  msTransform: 'translate3d(0, 0, 0)',
  OTransform: 'translate3d(0, 0, 0)',
  transform: 'translate3d(0, 0, 0)',
});

globalStyle('.slick-track', {
  margin: 'auto',
  paddingBottom: '1.6rem',
});

globalStyle('.slick-track:before, .slick-track:after', {
  display: 'table',
  content: "''",
});

globalStyle('.slick-track:after', {
  clear: 'both',
});

globalStyle('.slick-loading .slick-track', {
  visibility: 'hidden',
});

globalStyle('.slick-slide', {
  display: 'none',
  float: 'left',
  height: '100%',
  minHeight: '1px',
});

globalStyle("[dir='rtl'] .slick-slide", {
  float: 'right',
});

globalStyle('.slick-slide img', {
  display: 'block',
});

globalStyle('.slick-slide.slick-loading img', {
  display: 'none',
});

globalStyle('.slick-slide.dragging img', {
  pointerEvents: 'none',
});

globalStyle('.slick-initialized .slick-slide', {
  display: 'block',
});

globalStyle('.slick-loading .slick-slide', {
  visibility: 'hidden',
});

globalStyle('.slick-vertical .slick-slide', {
  display: 'block',
  height: 'auto',
  border: '1px solid transparent',
});

globalStyle('.slick-arrow.slick-hidden', {
  display: 'none',
});

/* 기본 슬라이드 스타일 */
globalStyle('.slick-slide', {
  transition: 'transform 0.5s ease, opacity 0.5s ease',
  opacity: 0.7,
  transform: 'scale(0.8)',
});

/* 중앙 슬라이드 스타일 */
globalStyle('.slick-center', {
  opacity: 1,
  transform: 'scale(1)',
});
