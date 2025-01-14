import { recipe } from '@vanilla-extract/recipes';
import { themeVars } from '../../styles';

export const floatingButtonVariants = recipe({
  base: {
    position: 'absolute',
    right: '2rem',
    bottom: '2rem',
    display: 'flex',
    padding: '0.5rem',
    borderRadius: '2rem',
    backgroundColor: themeVars.color.gray800,
    flexShrink: '0',
    zIndex: themeVars.zIndex.floatingButton.content,
  },
  variants: {
    md: {
      boxShadow: themeVars.shadowStyles.shadow_md,
    },
  },
});
