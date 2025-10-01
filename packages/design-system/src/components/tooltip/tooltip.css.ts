import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

const floatingAnimation = keyframes({
  '0%, 100%': {
    transform: 'translateY(4px)',
  },
  '50%': {
    transform: 'translateY(-5px)',
  },
});

export const tooltipContainer = style({
  position: 'relative',
  display: 'inline-block',
});

export const tooltipBubble = recipe({
  base: {
    background: themeVars.color.confeti_lime,
    padding: '0.7rem 1rem',
    borderRadius: '8px',
    ...themeVars.fontStyles.body4_m_13_2,
    color: themeVars.color.black,
    position: 'relative',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    zIndex: themeVars.zIndex.dropdown.tooltip,
  },
  variants: {
    position: {
      top: {
        position: 'absolute',
        bottom: '100%',
        marginBottom: '8.5px',
      },
      bottom: {
        position: 'absolute',
        top: '100%',
        marginTop: '8.5px',
      },
    },
    trigger: {
      none: {
        position: 'relative',
        margin: '0',
        display: 'inline-block',
      },
      interactive: {},
    },
    tailPosition: {
      'top-left': {},
      'top-right': {},
      'bottom-left': {},
      'bottom-right': {},
    },
    animated: {
      true: {
        animation: `${floatingAnimation} 2s ease-in-out infinite`,
      },
      false: {},
    },
  },
  compoundVariants: [
    // trigger가 none이 아닐 때만 화살표 표시
    // Top position - 아래쪽 화살표
    {
      variants: { position: 'top', tailPosition: 'bottom-left' },
      style: {
        '::after': {
          content: '""',
          position: 'absolute',
          top: '95%',
          left: '15px',
          width: '6px',
          height: '8.5px',
          backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='7' viewBox='0 0 6 7' fill='none'%3E%3Cpath d='M6 0.39209C5.086 4.52372 2.28674 6.39209 0 6.39209C0 6.39209 0.318511 5.53491 0.318511 3.25974C0.318511 0.984574 0.00321917 0.39209 0.00321917 0.39209H6Z' fill='%23B5F602'/%3E%3C/svg%3E")`,
          transform: 'scaleX(-1)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
        },
      },
    },
    {
      variants: { position: 'top', tailPosition: 'bottom-right' },
      style: {
        '::after': {
          content: '""',
          position: 'absolute',
          top: '95%',
          right: '15px',
          width: '6px',
          height: '8.5px',
          backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='7' viewBox='0 0 6 7' fill='none'%3E%3Cpath d='M6 0.39209C5.086 4.52372 2.28674 6.39209 0 6.39209C0 6.39209 0.318511 5.53491 0.318511 3.25974C0.318511 0.984574 0.00321917 0.39209 0.00321917 0.39209H6Z' fill='%23B5F602'/%3E%3C/svg%3E")`,

          backgroundRepeat: 'no-repeat',
        },
      },
    },
    {
      variants: { position: 'top', tailPosition: 'top-left' },
      style: {
        '::after': {
          content: '""',
          position: 'absolute',
          bottom: '90%',
          left: '15px',
          width: '6px',
          height: '8.5px',
          backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='7' viewBox='0 0 6 7' fill='none'%3E%3Cpath d='M0 6.39209C0.914 2.26046 3.71326 0.39209 6 0.39209C6 0.39209 5.68149 1.24927 5.68149 3.52444C5.68149 5.7996 5.99678 6.39209 5.99678 6.39209H0Z' fill='%23B5F602'/%3E%3C/svg%3E")`,

          backgroundRepeat: 'no-repeat',
        },
      },
    },
    {
      variants: { position: 'top', tailPosition: 'top-right' },
      style: {
        '::after': {
          content: '""',
          position: 'absolute',
          bottom: '90%',
          right: '15px',
          width: '6px',
          height: '8.5px',
          backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='7' viewBox='0 0 6 7' fill='none'%3E%3Cpath d='M0 6.39209C0.914 2.26046 3.71326 0.39209 6 0.39209C6 0.39209 5.68149 1.24927 5.68149 3.52444C5.68149 5.7996 5.99678 6.39209 5.99678 6.39209H0Z' fill='%23B5F602'/%3E%3C/svg%3E")`,
          transform: 'scaleX(-1)',

          backgroundRepeat: 'no-repeat',
        },
      },
    },
    // Bottom position - 위쪽 화살표
    {
      variants: { position: 'bottom', tailPosition: 'top-left' },
      style: {
        '::after': {
          content: '""',
          position: 'absolute',
          bottom: '100%',
          left: '15px',
          width: '6px',
          height: '8.5px',
          backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='7' viewBox='0 0 6 7' fill='none'%3E%3Cpath d='M6 0.39209C5.086 4.52372 2.28674 6.39209 0 6.39209C0 6.39209 0.318511 5.53491 0.318511 3.25974C0.318511 0.984574 0.00321917 0.39209 0.00321917 0.39209H6Z' fill='%23B5F602'/%3E%3C/svg%3E")`,

          backgroundRepeat: 'no-repeat',
        },
      },
    },
    {
      variants: { position: 'bottom', tailPosition: 'top-right' },
      style: {
        '::after': {
          content: '""',
          position: 'absolute',
          bottom: '100%',
          right: '15px',
          width: '6px',
          height: '8.5px',
          backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='7' viewBox='0 0 6 7' fill='none'%3E%3Cpath d='M6 0.39209C5.086 4.52372 2.28674 6.39209 0 6.39209C0 6.39209 0.318511 5.53491 0.318511 3.25974C0.318511 0.984574 0.00321917 0.39209 0.00321917 0.39209H6Z' fill='%23B5F602'/%3E%3C/svg%3E")`,

          backgroundRepeat: 'no-repeat',
        },
      },
    },
  ],
  defaultVariants: {
    position: 'top',
    tailPosition: 'bottom-right',
    animated: false,
    trigger: 'interactive',
  },
});
