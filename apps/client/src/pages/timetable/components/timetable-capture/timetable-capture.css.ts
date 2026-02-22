import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@confeti/design-system/styles';

import {
  HALF_HOUR_HEIGHT_PX,
  HOUR_HEIGHT_PX,
} from '@pages/timetable/constants';
import {
  CAPTURE_HEIGHT,
  CAPTURE_LEFT_PADDING,
  CAPTURE_POSTER_CONTENT_WIDTH,
  CAPTURE_POSTER_PADDING,
  CAPTURE_POSTER_WIDTH,
  CAPTURE_RIGHT_PADDING,
  CAPTURE_STAGE_HEADER_HEIGHT,
  CAPTURE_TIME_LABEL_WIDTH,
  CAPTURE_WIDTH,
} from '@pages/timetable/constants/capture';

// ── Offscreen wrapper (hook에서 캡처 요소를 숨기기 위한 컨테이너) ──
export const offscreenWrapper = style({
  position: 'fixed',
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  overflow: 'hidden',
  pointerEvents: 'none',
});

// ── Root container ──
export const captureRoot = style({
  width: `${CAPTURE_WIDTH}px`,
  height: `${CAPTURE_HEIGHT}px`,
  backgroundColor: '#ffffff',
  display: 'flex',
  overflow: 'hidden',
});

// ══════════════════════════════════════════
// ── Left Panel (Poster with blur overlay) ──
// ══════════════════════════════════════════

export const posterPanel = style({
  width: `${CAPTURE_POSTER_WIDTH}px`,
  height: `${CAPTURE_HEIGHT}px`,
  flexShrink: 0,
  position: 'relative',
  overflow: 'hidden',
});

export const posterBgImage = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  filter: 'blur(10px)',
  transform: 'scale(1.1)',
});

export const posterOverlay = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(18,18,18,0.7)',
});

export const posterContent = style({
  position: 'absolute',
  top: `${CAPTURE_POSTER_PADDING}px`,
  bottom: `${CAPTURE_POSTER_PADDING}px`,
  left: `${CAPTURE_LEFT_PADDING}px`,
  width: `${CAPTURE_POSTER_CONTENT_WIDTH}px`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

export const posterTopGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '61px',
});

export const titleBlock = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '48px',
});

export const dayRow = style({
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
});

export const dayLabel = style({
  fontWeight: '700',
  fontSize: '42px',
  lineHeight: '1.2',
  color: themeVars.color.confeti_lime,
  display: 'flex',
  gap: '4px',
});

export const dateLabel = style({
  fontWeight: '700',
  fontSize: '24px',
  lineHeight: 'normal',
  color: '#F9FAFE',
});

export const festivalTitle = style({
  fontWeight: '700',
  fontSize: '36px',
  lineHeight: 'normal',
  color: '#ffffff',
  whiteSpace: 'pre-wrap',
  wordBreak: 'keep-all',
});

export const artistSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

export const separator = style({
  width: `${CAPTURE_POSTER_CONTENT_WIDTH}px`,
  height: '1px',
  backgroundColor: 'rgba(255,255,255,0.3)',
});

export const artistList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

export const artistRow = style({
  display: 'flex',
  gap: '16px',
  alignItems: 'flex-start',
  justifyContent: 'flex-end',
});

export const artistRowName = style({
  flex: '1 0 0',
  fontWeight: '700',
  fontSize: '16px',
  lineHeight: 'normal',
  color: '#ffffff',
  whiteSpace: 'pre-wrap',
});

export const artistRowTime = style({
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: 'normal',
  color: '#ffffff',
  textAlign: 'right',
  flexShrink: 0,
});

export const logoArea = style({
  width: '80px',
  height: '66px',
});

// ══════════════════════════════════════════
// ── Right Panel (Timetable area) ──
// ══════════════════════════════════════════

export const timetableArea = style({
  width: `${CAPTURE_WIDTH - CAPTURE_POSTER_WIDTH}px`,
  height: `${CAPTURE_HEIGHT}px`,
  flexShrink: 0,
  position: 'relative',
  overflow: 'hidden',
  paddingLeft: `${CAPTURE_LEFT_PADDING}px`,
  paddingRight: `${CAPTURE_RIGHT_PADDING}px`,
  boxSizing: 'border-box',
  paddingTop: '40px',
});

export const timetableContent = style({
  transformOrigin: 'top left',
});

// ── Stage header ──
export const stageHeader = style({
  display: 'flex',
  height: `${CAPTURE_STAGE_HEADER_HEIGHT}px`,
  paddingLeft: `${CAPTURE_TIME_LABEL_WIDTH}px`,
  alignItems: 'center',
  backgroundColor: themeVars.color.gray900,
  borderRadius: '2px 2px 0 0',
  marginBottom: '25px',
});

export const stageHeaderItem = style({
  flex: 1,
  textAlign: 'center',
  ...themeVars.fontStyles.body5_m_12,
  color: '#ffffff',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'pre-wrap',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '4px 8px',
});

export const stageHeaderSeparator = style({
  width: '0.5px',
  height: '16px',
  backgroundColor: 'rgba(255,255,255,0.3)',
  flexShrink: 0,
});

// ── Time grid ──
export const timeGrid = style({
  position: 'relative',
});

export const hourCell = style({
  position: 'relative',
  height: `${HOUR_HEIGHT_PX}px`,
  width: '100%',
});

export const timeLabel = recipe({
  base: {
    ...themeVars.fontStyles.body5_r_12,
    position: 'absolute',
    left: 0,
    width: `${CAPTURE_TIME_LABEL_WIDTH}px`,
    textAlign: 'center',
    zIndex: 2,
    transform: 'translateY(-50%)',
  },
  variants: {
    type: {
      hour: {
        top: 0,
        color: themeVars.color.gray600,
      },
      half: {
        top: `${HALF_HOUR_HEIGHT_PX}px`,
        color: themeVars.color.gray400,
      },
    },
  },
  defaultVariants: {
    type: 'hour',
  },
});

export const timeLine = style({
  position: 'absolute',
  left: `${CAPTURE_TIME_LABEL_WIDTH}px`,
  right: 0,
  height: '1px',
  backgroundColor: themeVars.color.gray300,
  border: 'none',
  margin: 0,
  top: 0,
});

// ── Booth open box ──
export const boothOpenBox = style({
  ...themeVars.fontStyles.body3_m_14,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: 0,
  left: `${CAPTURE_TIME_LABEL_WIDTH}px`,
  height: `${HALF_HOUR_HEIGHT_PX}px`,
  right: 0,
  color: themeVars.color.gray600,
  backgroundColor: themeVars.color.gray200,
  borderRadius: '2px',
  zIndex: 1,
});

// ── Stages container ──
export const stagesContainer = style({
  display: 'flex',
  position: 'absolute',
  left: `${CAPTURE_TIME_LABEL_WIDTH}px`,
  right: 0,
  top: 0,
  bottom: 0,
});

export const stageColumn = style({
  flex: 1,
  position: 'relative',
});

// ── Capture item (performance block) ──
export const itemTop = createVar();
export const itemHeight = createVar();

export const captureItem = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    position: 'absolute',
    top: itemTop,
    width: '100%',
    height: itemHeight,
    borderRadius: '2px',
    zIndex: 1,
    padding: '4px 4px 8px 4px',
    boxSizing: 'border-box',
    borderTop: `1px solid ${themeVars.color.gray300}`,
    borderLeft: `1px solid ${themeVars.color.gray300}`,
    borderRight: 'none',
    borderBottom: 'none',
    filter: `drop-shadow(1px 0 0 ${themeVars.color.gray300}) drop-shadow(0 1px 0 ${themeVars.color.gray300})`,
  },
  variants: {
    isSelected: {
      true: {
        backgroundColor: themeVars.color.confeti_lime,
        color: themeVars.color.black,
      },
      false: {
        backgroundColor: themeVars.color.gray100,
      },
    },
  },
  defaultVariants: {
    isSelected: true,
  },
});

export const artistName = recipe({
  base: {
    width: '100%',
    maxWidth: '100%',
    display: 'block',
    ...themeVars.fontStyles.subtitle4_b_14,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    backgroundColor: 'inherit',
    boxSizing: 'border-box',
    padding: '0 2px',
  },
  variants: {
    isSelected: {
      true: {
        color: themeVars.color.black,
      },
      false: {
        color: themeVars.color.gray500,
      },
    },
  },
  defaultVariants: {
    isSelected: true,
  },
});

export const durationText = recipe({
  base: {
    ...themeVars.fontStyles.caption_r_10,
    whiteSpace: 'nowrap',
    backgroundColor: 'inherit',
  },
  variants: {
    isSelected: {
      true: {
        color: themeVars.color.gray800,
      },
      false: {
        color: themeVars.color.gray500,
      },
    },
  },
  defaultVariants: {
    isSelected: true,
  },
});
