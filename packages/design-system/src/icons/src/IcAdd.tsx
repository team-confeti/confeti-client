import type { SVGProps } from 'react';
const SvgIcAdd = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 31 30"
    {...props}
  >
    <g clipPath="url(#ic_add_svg__a)">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M16.554 4H14.11v9.778H4.332v2.444h9.778V26h2.444v-9.778h9.778v-2.444h-9.778z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="ic_add_svg__a">
        <path fill="#fff" d="M.332 0h30v30h-30z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgIcAdd;
