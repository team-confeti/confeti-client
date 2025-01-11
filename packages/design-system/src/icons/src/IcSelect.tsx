import type { SVGProps } from 'react';
const SvgIcSelect = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 28 28"
    {...props}
  >
    <g clipPath="url(#ic_select_svg__a)">
      <path
        fill="#B5F602"
        d="M14 2.333C7.56 2.333 2.333 7.56 2.333 14S7.56 25.667 14 25.667 25.666 20.44 25.666 14 20.44 2.333 14 2.333m0 21c-5.145 0-9.334-4.188-9.334-9.333S8.855 4.667 14 4.667 23.333 8.855 23.333 14 19.145 23.333 14 23.333m4.526-13.661-6.86 6.86-2.193-2.194a1.16 1.16 0 0 0-1.645 0 1.16 1.16 0 0 0 0 1.645l3.022 3.022c.455.455 1.19.455 1.645 0l7.688-7.688a1.16 1.16 0 0 0 0-1.645 1.176 1.176 0 0 0-1.657 0"
      />
    </g>
    <defs>
      <clipPath id="ic_select_svg__a">
        <path fill="#fff" d="M0 0h28v28H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgIcSelect;
