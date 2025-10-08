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

const fadeInAnimation = keyframes({
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

const fadeOutAnimation = keyframes({
  '0%': {
    opacity: 1,
  },
  '100%': {
    opacity: 0,
  },
});

const tailSVG = `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='7' viewBox='0 0 6 7' fill='none'%3E%3Cpath d='M6 0.39209C5.086 4.52372 2.28674 6.39209 0 6.39209C0 6.39209 0.318511 5.53491 0.318511 3.25974C0.318511 0.984574 0.00321917 0.39209 0.00321917 0.39209H6Z' fill='%23B5F602'/%3E%3C/svg%3E")`;

const createTailStyle = (position: string, side: string, rotate: string) =>
  ({
    content: '""',
    position: 'absolute',
    [position]: '95%',
    [side]: '1.5rem',
    width: '0.6rem',
    height: '0.8rem',
    backgroundImage: tailSVG,
    ...(rotate && { transform: `rotate(${rotate})` }),
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  }) as const;

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
        marginBottom: '0.85rem',
      },
      bottom: {
        position: 'absolute',
        top: '100%',
        marginTop: '0.8rem',
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
      none: {},
    },
    animated: {
      true: {
        animation: `${floatingAnimation} 2s ease-in-out infinite`,
      },
      false: {},
    },
    showType: {
      'click-in': {
        animation: `${fadeInAnimation} 0.3s ease-out`,
      },
      'click-out': {
        animation: `${fadeOutAnimation} 0.3s ease-out`,
      },
      hover: {},
      none: {},
    },
  },
  compoundVariants: [
    {
      variants: { position: 'top', tailPosition: 'bottom-left' },
      style: { '::after': createTailStyle('top', 'left', '90deg') },
    },
    {
      variants: { position: 'top', tailPosition: 'bottom-right' },
      style: { '::after': createTailStyle('top', 'right', '') },
    },
    {
      variants: { position: 'top', tailPosition: 'top-left' },
      style: { '::after': createTailStyle('bottom', 'left', '180deg') },
    },
    {
      variants: { position: 'top', tailPosition: 'top-right' },
      style: { '::after': createTailStyle('bottom', 'right', '270deg') },
    },
    {
      variants: { position: 'bottom', tailPosition: 'top-left' },
      style: { '::after': createTailStyle('bottom', 'left', '180deg') },
    },
    {
      variants: { position: 'bottom', tailPosition: 'top-right' },
      style: { '::after': createTailStyle('bottom', 'right', '270deg') },
    },
    {
      variants: { position: 'bottom', tailPosition: 'bottom-left' },
      style: { '::after': createTailStyle('top', 'left', '90deg') },
    },
    {
      variants: { position: 'bottom', tailPosition: 'bottom-right' },
      style: { '::after': createTailStyle('top', 'right', '270deg') },
    },
  ],
  defaultVariants: {
    position: 'top',
    tailPosition: 'bottom-right',
    animated: false,
    trigger: 'interactive',
    showType: 'hover',
  },
});

export const tooltipContent = style({
  marginLeft: '-1.5rem',
});
