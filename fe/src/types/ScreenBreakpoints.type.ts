export const ScreenBreakpoints = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24,
] as const;
export type xl = (typeof ScreenBreakpoints)[number];
export type lg = (typeof ScreenBreakpoints)[number];
export type md = (typeof ScreenBreakpoints)[number];
export type sm = (typeof ScreenBreakpoints)[number];
export type xs = (typeof ScreenBreakpoints)[number];

export type SizePerScreenBreakpoint = [xl, lg, md, sm, xs];
export interface ScreenBreakpoints {
  xs?: xs;
  sm?: sm;
  md?: md;
  lg?: lg;
  xl?: xl;
}

export type ComponentRenderer = () => React.ReactNode;
