export const display = {
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexAlignCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  flexCenterStretch: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexColumnCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  flexColumnLeft: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'left',
  },
  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  flexColumnStart: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  },
} as const;
