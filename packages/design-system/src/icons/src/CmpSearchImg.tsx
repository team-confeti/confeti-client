import type { SVGProps } from 'react';
const SvgCmpSearchImg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 30 30"
    {...props}
  >
    <g clipPath="url(#cmp_search_img_svg__a)">
      <rect width={30} height={30} fill="#fff" rx={15} />
      <path fill="#D9DADD" d="M0 0h30v30H0z" />
      <circle
        cx={14.357}
        cy={13.714}
        r={4.821}
        stroke="#fff"
        strokeWidth={1.929}
      />
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth={1.929}
        d="m17.572 18.287 2.048 3.14"
      />
    </g>
    <defs>
      <clipPath id="cmp_search_img_svg__a">
        <rect width={30} height={30} fill="#fff" rx={15} />
      </clipPath>
    </defs>
  </svg>
);
export default SvgCmpSearchImg;
