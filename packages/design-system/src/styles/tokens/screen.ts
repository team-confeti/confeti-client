const screen = {
  sm: (css: React.CSSProperties) => {
    return {
      '@media': {
        '(min-width: 375px)': css,
      },
    };
  },
  md: (css: React.CSSProperties) => {
    return {
      '@media': {
        '(min-width: 400px)': css,
      },
    };
  },
  lg: (css: React.CSSProperties) => {
    return {
      '@media': {
        '(min-width: 430px)': css,
      },
    };
  },
} as const;

export default screen;
