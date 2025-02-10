import { recipe } from '@vanilla-extract/recipes';
import { themeVars } from '../../styles';

export const floatingButtonVariants = recipe({
  base: {
    position: 'absolute',
    width: '4rem',
    height: '4rem',
    display: 'flex',
    padding: '0.5rem',
    borderRadius: '2rem',
    backgroundColor: themeVars.color.gray800,
    zIndex: themeVars.zIndex.floatingButton.content,
    flexShrink: '0',
    bottom: '1.4rem',
    right: '2rem',
    '@media': {
      screen: {
        position: 'fixed',
        right: 'max(2rem, calc((100vw - var(--max-width)) / 2 + 2rem))',
      },
    },
  },
  variants: {
    md: {
      boxShadow: themeVars.shadowStyles.shadow_md_1,
    },
  },
});
