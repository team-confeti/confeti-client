import { createVar, globalStyle } from '@vanilla-extract/css';

/**
 * Admin-specific CSS custom properties for colors not available in themeVars.
 * These are colors used in the admin panel that don't map to the design system tokens.
 */
export const adminVars = {
  // Neutral scale (Tailwind neutral)
  neutral50: createVar(),
  neutral100: createVar(),
  neutral200: createVar(),
  neutral400: createVar(),
  neutral600: createVar(),
  neutral900: createVar(),

  // Gray scale (Tailwind gray — different from design system gray)
  gray50tw: createVar(),
  gray100tw: createVar(),
  gray200tw: createVar(),
  gray400tw: createVar(),
  gray500tw: createVar(),
  gray600tw: createVar(),
  gray900tw: createVar(),

  // Slate scale (Tailwind slate — additional values)
  slate50: createVar(),
  slate400tw: createVar(),
  slate600tw: createVar(),
  slate800: createVar(),

  // Indigo (legacy form colors — to be phased out in future)
  indigo500: createVar(),
  indigo600: createVar(),

  // Red scale (additional)
  red100: createVar(),
  red400: createVar(),
  red700: createVar(),
  red800: createVar(),

  // Blue scale (additional)
  blue50: createVar(),
  blue100: createVar(),
  blue800: createVar(),

  // Green scale (additional)
  green100: createVar(),
  green800: createVar(),

  // Amber scale
  amber100: createVar(),
  amber700: createVar(),
  amber800: createVar(),

  // Yellow scale
  yellow100: createVar(),

  // Misc
  placeholder: createVar(),
  deleteHoverBg: createVar(),
  lightGray: createVar(),
  selectedRowBg: createVar(),
};

globalStyle(':root', {
  vars: {
    // Neutral scale
    [adminVars.neutral50]: '#FAFAFA',
    [adminVars.neutral100]: '#F5F5F5',
    [adminVars.neutral200]: '#E5E5E5',
    [adminVars.neutral400]: '#A3A3A3',
    [adminVars.neutral600]: '#525252',
    [adminVars.neutral900]: '#171717',

    // Gray scale (Tailwind)
    [adminVars.gray50tw]: '#F9FAFB',
    [adminVars.gray100tw]: '#F3F4F6',
    [adminVars.gray200tw]: '#E5E7EB',
    [adminVars.gray400tw]: '#9CA3AF',
    [adminVars.gray500tw]: '#6B7280',
    [adminVars.gray600tw]: '#4B5563',
    [adminVars.gray900tw]: '#111827',

    // Slate scale (Tailwind)
    [adminVars.slate50]: '#F8FAFC',
    [adminVars.slate400tw]: '#98A2B3',
    [adminVars.slate600tw]: '#4A5565',
    [adminVars.slate800]: '#1E2939',

    // Indigo (legacy)
    [adminVars.indigo500]: '#6366F1',
    [adminVars.indigo600]: '#4F46E5',

    // Red scale
    [adminVars.red100]: '#FEE2E2',
    [adminVars.red400]: '#F56565',
    [adminVars.red700]: '#B91C1C',
    [adminVars.red800]: '#991B1B',

    // Blue scale
    [adminVars.blue50]: '#EFF6FF',
    [adminVars.blue100]: '#DBEAFE',
    [adminVars.blue800]: '#1E40AF',

    // Green scale
    [adminVars.green100]: '#D1FAE5',
    [adminVars.green800]: '#065F46',

    // Amber scale
    [adminVars.amber100]: '#FEF3C7',
    [adminVars.amber700]: '#A65F00',
    [adminVars.amber800]: '#92400E',

    // Yellow scale
    [adminVars.yellow100]: '#FEF9C2',

    // Misc
    [adminVars.placeholder]: '#98A2B3',
    [adminVars.deleteHoverBg]: '#FEE2E2',
    [adminVars.lightGray]: '#F0F0F0',
    [adminVars.selectedRowBg]: '#F0F7FF',
  },
});
