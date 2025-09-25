import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../../styles';

export const numberIndicatorVariants = recipe({
  base: {
    ...themeVars.fontStyles.body6_m_11,
    color: themeVars.color.white,
    padding: '0.4rem 0.8rem',
    textAlign: 'center',
    backgroundColor: themeVars.color.white_op_20,
    borderRadius: '11px',
  },
});
