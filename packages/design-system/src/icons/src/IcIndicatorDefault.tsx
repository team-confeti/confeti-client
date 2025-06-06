import type { SVGProps } from 'react';
const SvgIcIndicatorDefault = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    {...props}
  >
    <rect width={6} height={6} fill="#C5C6CB" rx={3} />
  </svg>
);
export default SvgIcIndicatorDefault;
