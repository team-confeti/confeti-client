import { createTheme } from '@vanilla-extract/css';
import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';
import { color } from './tokens/color';
import { typography } from './tokens/typography';
import { fontStyles } from './tokens/font-styles';
import { border } from './tokens/border';
import { zIndex } from './tokens/z-index';
import { display } from './tokens/display';

const tokens = {
  color: color,
  fontStyles: fontStyles,
  zIndex: zIndex,
  display: display,
  border: border,
    ...typography,
};

const properties = defineProperties({
  properties: tokens,
});
const sprinkles = createSprinkles(properties);

const [themeClass, themeVars] = createTheme(tokens);

export { themeClass, themeVars, sprinkles, tokens };
