import { createGlobalTheme } from '@vanilla-extract/css';
import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

import { border } from './tokens/border';
import { shadowStyles } from './tokens/box-shadow';
import { color } from './tokens/color';
import { display } from './tokens/display';
import { fontStyles } from './tokens/font-styles';
import { overlay } from './tokens/overlay';
import { typography } from './tokens/typography';
import { zIndex } from './tokens/z-index';

const tokens = {
  color: color,
  fontStyles: fontStyles,
  zIndex: zIndex,
  display: display,
  border: border,
  overlay: overlay,
  ...typography,
  shadowStyles,
};

const properties = defineProperties({
  properties: tokens,
});
const sprinkles = createSprinkles(properties);

const themeVars = createGlobalTheme(':root', tokens);

export { sprinkles, themeVars, tokens };
