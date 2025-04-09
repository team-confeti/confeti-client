import type { SVGProps } from 'react';
const SvgIcSwitch = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      stroke="#121212"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.91}
      d="M9.27 3.814v8.189L12 9.273m-5.004 2.912V3.996l-2.73 2.73"
    />
  </svg>
);
export default SvgIcSwitch;
