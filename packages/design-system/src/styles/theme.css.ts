import { createTheme } from '@vanilla-extract/css';
import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';
import { color } from './tokens/color.css';
import { typography } from './tokens/typography.css';

const tokens = {
  color: color,
  ...typography,
};

const properties = defineProperties({
  properties: tokens,
});
const sprinkles = createSprinkles(properties);

const [themeClass, themeVars] = createTheme(tokens);

export { themeClass, themeVars, sprinkles, tokens };
