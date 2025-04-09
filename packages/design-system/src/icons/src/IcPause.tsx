import type { SVGProps } from 'react';
const SvgIcPause = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g clipPath="url(#ic_pause_svg__a)">
      <path fill="#B5F602" d="M6 19h4V5H6zm8-14v14h4V5z" />
    </g>
    <defs>
      <clipPath id="ic_pause_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgIcPause;
