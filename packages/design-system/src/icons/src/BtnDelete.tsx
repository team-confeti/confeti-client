import type { SVGProps } from 'react';
const SvgBtnDelete = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 36 36"
    {...props}
  >
    <g clipPath="url(#btn_delete_svg__a)">
      <rect width={24} height={24} x={6} y={6} fill="#FA4250" rx={12} />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M10.456 18a1 1 0 0 1 1-1h13.09a1 1 0 1 1 0 2h-13.09a1 1 0 0 1-1-1"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="btn_delete_svg__a">
        <path fill="#fff" d="M6 6h24v24H6z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgBtnDelete;
