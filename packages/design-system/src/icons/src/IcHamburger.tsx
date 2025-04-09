import type { SVGProps } from 'react';
const SvgIcHamburger = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#75777F"
      strokeLinecap="round"
      strokeWidth={2}
      d="M20 18H4m16-6H4m16-6H4"
    />
  </svg>
);
export default SvgIcHamburger;
