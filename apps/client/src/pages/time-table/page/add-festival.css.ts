import { themeVars } from '@confeti/design-system/styles';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  ...themeVars.display.flexColumn,
  height: '100vh',
});

export const container = style({
  flex: 1,
  overflowY: 'auto',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  padding: '2.4rem 2rem',
  gridColumnGap: '1.8rem',
  gridRowGap: '3rem',
  paddingBottom: '9rem', // 버튼 영역만큼 패딩
});

export const buttonSection = style({
  position: 'fixed',
  bottom: 0,
  padding: '2rem',
  width: '100%',
  //   left: 0, // 뷰포트의 왼쪽 끝에 고정
  //   right: 0, // 뷰포트의 오른쪽 끝에 고정
  height: '9rem',
  backgroundColor: themeVars.color.white,
});

export const addBtn = style({
  cursor: 'pointer',
});
