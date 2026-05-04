import { globalStyle } from '@vanilla-extract/css';

globalStyle(':root', {
  vars: {
    '--safe-area-top': 'env(safe-area-inset-top, 0px)',
    '--safe-area-bottom': 'env(safe-area-inset-bottom, 0px)',
    '--safe-area-left': 'env(safe-area-inset-left, 0px)',
    '--safe-area-right': 'env(safe-area-inset-right, 0px)',
    '--safe-area-y':
      'calc(env(safe-area-inset-top, 0px) + env(safe-area-inset-bottom, 0px))',
  },
});

globalStyle('.cap-native, .cap-native body', {
  overscrollBehavior: 'none',
  overscrollBehaviorY: 'none',
});

globalStyle('.cap-native body', {
  touchAction: 'pan-x pan-y',
});

// design-system이 html/body에 display:flex를 적용해 iOS WKWebView에서 position:sticky가 동작하지 않는 문제 우회.
globalStyle('html, body', {
  display: 'block',
});
