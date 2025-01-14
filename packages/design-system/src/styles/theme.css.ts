import { createTheme } from '@vanilla-extract/css';
import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';
import { color } from './tokens/color';
import { typography } from './tokens/typography';
import { fontStyles } from './tokens/font-styles';
import { border } from './tokens/border';
import { zIndex } from './tokens/z-index';
import { display } from './tokens/display';
import { overlay } from './tokens/overlay';
import { shadowStyles } from './tokens/box-shadow';

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

const [themeClass, themeVars] = createTheme(tokens);

export { themeClass, themeVars, sprinkles, tokens };
