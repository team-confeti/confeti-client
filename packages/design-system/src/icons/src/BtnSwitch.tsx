import type { SVGProps } from 'react';
const SvgBtnSwitch = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <g clipPath="url(#btn_switch_svg__a)">
      <path
        stroke="#121212"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={0.91}
        d="M9.27 3.814v8.189L12 9.273m-5.004 2.912V3.996l-2.73 2.73"
      />
    </g>
    <defs>
      <clipPath id="btn_switch_svg__a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgBtnSwitch;
