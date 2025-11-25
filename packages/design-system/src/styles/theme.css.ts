import { createTheme } from '@vanilla-extract/css';

import { border } from './tokens/border';
import { shadowStyles } from './tokens/box-shadow';
import { color } from './tokens/color';
import { display } from './tokens/display';
import { fontStyles } from './tokens/font-styles';
import { overlay } from './tokens/overlay';
import { size } from './tokens/size';
import { typography } from './tokens/typography';
import { zIndex } from './tokens/z-index';

const tokens = {
  color: color,
  fontStyles: fontStyles,
  display: display,
  border: border,
  overlay: overlay,
  size: size,
  zIndex: zIndex,
  shadowStyles,
  ...typography,
};

const [themeClass, themeVars] = createTheme(tokens);

export { themeClass, themeVars, tokens };
