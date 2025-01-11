import type { SVGProps } from 'react';
const SvgIcIndicatorActive = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 6 6"
    {...props}
  >
    <rect width={6} height={6} fill="#92C015" rx={3} />
  </svg>
);
export default SvgIcIndicatorActive;
