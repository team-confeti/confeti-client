import { color } from './color';

export const border = {
  lime1: `2px solid ${color.confeti_lime}`,
  lime3: `1px solid ${color.confeti_lime3}`,
  black: `1px solid ${color.black}`,
  gray200: `1px solid ${color.gray200}`,
  gray300: `1px solid ${color.gray300}`,
  gray400: `1.5px solid ${color.gray400}`,
  gray500_dashed: `1px dashed ${color.gray500}`,
} as const;
