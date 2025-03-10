export const display = {
  flexJustifyAlignCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexAlignCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexColumnAlignTextCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  flexBetweenAlignCenter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
} as const;
