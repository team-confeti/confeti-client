import type { SVGProps } from 'react';
const SvgBtnClose = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 18 18"
    {...props}
  >
    <g clipPath="url(#btn_close_svg__a)">
      <circle cx={9} cy={9} r={9} fill="#C5C6CB" />
      <path
        fill="#fff"
        d="m9 10.05-2.174 2.174a.71.71 0 0 1-.525.207.71.71 0 0 1-.525-.207.71.71 0 0 1-.207-.525q0-.318.207-.525L7.95 9 5.776 6.843a.71.71 0 0 1-.207-.525q0-.318.207-.525a.71.71 0 0 1 .525-.206q.318 0 .525.206L9 7.968l2.156-2.175a.71.71 0 0 1 .525-.206q.318 0 .525.206a.73.73 0 0 1 .225.535.67.67 0 0 1-.225.515L10.032 9l2.175 2.175a.71.71 0 0 1 .206.525.71.71 0 0 1-.206.525.73.73 0 0 1-.535.225.67.67 0 0 1-.515-.225z"
      />
    </g>
    <defs>
      <clipPath id="btn_close_svg__a">
        <path fill="#fff" d="M0 0h18v18H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgBtnClose;
