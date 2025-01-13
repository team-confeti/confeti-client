import { recipe } from '@vanilla-extract/recipes';
import { themeVars } from '../../styles';

export const container = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    height: '5rem',
    backgroundColor: themeVars.color.white,
  },
  variants: {
    variant: {
      default: {
        justifyContent: 'space-between',
        padding: '0.8rem 2rem',
      },
      detail: {
        padding: '1.2rem 0 1.2rem 2rem',
        borderBottom: `1px solid ${themeVars.color.gray300}`,
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const logo = recipe({
  base: {
    width: '9.7059rem',
    height: '100%',
  },
});

export const iconSection = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.2rem',
  },
});

export const button = recipe({
  base: {
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
  },
  variants: {
    variant: {
      default: {
        width: '2.4rem',
        height: '2.4rem',
      },
      back: {
        width: '2rem',
        height: '2rem',
        position: 'absolute',
        left: '2rem',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const icon = recipe({
  base: {
    width: '100%',
    height: '100%',
  },
});

export const title = recipe({
  base: {
    ...themeVars.fontStyles.title4_b_16,
    color: themeVars.color.black,
    textAlign: 'center',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
  },
});
