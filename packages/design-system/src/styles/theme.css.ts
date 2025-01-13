import { createTheme } from '@vanilla-extract/css';
import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';
import { color } from './tokens/color';
import { typography } from './tokens/typography';
import { fontStyles } from './tokens/font-styles';
import { border } from './tokens/border';

const tokens = {
  color: color,
  border: border,
  ...typography,
  fontStyles,
};

const properties = defineProperties({
  properties: tokens,
});
const sprinkles = createSprinkles(properties);

const [themeClass, themeVars] = createTheme(tokens);

export { themeClass, themeVars, sprinkles, tokens };
