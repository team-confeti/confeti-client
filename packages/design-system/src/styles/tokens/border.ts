import { color } from './color';

export const border = {
  black: `1px solid ${color.black}`,
  lime1: `2px solid ${color.confeti_lime}`,
  lime2: `1px solid ${color.confeti_lime}`,
  lime3: `1px solid ${color.confeti_lime3}`,
  gray200: `1px solid ${color.gray200}`,
  gray300: `1px solid ${color.gray300}`,
  gray400: `1px solid ${color.gray400}`,
  gray500_dashed: `1px dashed ${color.gray500}`,
} as const;
