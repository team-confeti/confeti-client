import { recipe } from '@vanilla-extract/recipes';

export const buttonStyle = recipe({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.4rem',

    border: 'none',
    borderRadius: '8px',

    fontWeight: 500,

    whiteSpace: 'nowrap',

    cursor: 'pointer',

    ':disabled': {
      backgroundColor: '#F8F8FB',
      color: '#99A1B2',

      cursor: 'default',
    },

    transition: 'all .2s ease-in',
  },

  variants: {
    color: {
      primary: {
        color: '#FFFFFF',
        backgroundColor: '#6D77FF',

        '&:hover': {
          backgroundColor: '#444EE4',
        },
      },
      secondary: {
        color: '#6D77FF',
        backgroundColor: '#F3F5FF',

        '&:hover': {
          backgroundColor: '#E3E8FF',
        },
      },
      tertiary: {
        color: '#525866',
        backgroundColor: '#F8F8FB',

        '&:hover': {
          backgroundColor: '#ECECF1',
        },
      },
      outline: {
        color: '#525866',
        backgroundColor: '#FFFFFF',

        '&:hover': {
          backgroundColor: '#F8F8FB',
        },
      },
    },

    size: {
      xLarge: {
        padding: '1.6rem 1.4rem',

        fontSize: '1.4rem',
        lineHeight: '1.4rem',
      },

      large: {
        padding: '1.4rem',

        fontSize: '1.2rem',
        lineHeight: '1.2rem',
      },

      medium: {
        padding: '1.2rem 1.4rem',

        fontSize: '1.2rem',
        lineHeight: '1.2rem',
      },
    },
  },

  defaultVariants: {
    color: 'primary',
    size: 'medium',
  },
});
