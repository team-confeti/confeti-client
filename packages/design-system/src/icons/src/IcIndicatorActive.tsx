import type { SVGProps } from 'react';
const SvgIcIndicatorActive = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 25 6"
    {...props}
  >
    <rect width={24} height={6} x={0.5} fill="#B5F602" rx={3} />
  </svg>
);
export default SvgIcIndicatorActive;
