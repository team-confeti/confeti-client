import type { SVGProps } from 'react';
const SvgBtnFestivalDelete = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <rect width={24} height={24} fill="#323339" rx={12} />
    <path
      fill="#E9FFAC"
      d="m12 13.031-2.175 2.175a.71.71 0 0 1-.525.207.71.71 0 0 1-.525-.207.71.71 0 0 1-.206-.525q0-.318.206-.525l2.175-2.175-2.175-2.156A.71.71 0 0 1 8.57 9.3q0-.318.206-.525A.71.71 0 0 1 9.3 8.57q.32 0 .525.206L12 10.95l2.156-2.175a.71.71 0 0 1 .525-.206q.32 0 .525.206a.73.73 0 0 1 .225.534.67.67 0 0 1-.225.516l-2.175 2.156 2.175 2.175a.71.71 0 0 1 .207.525.71.71 0 0 1-.207.525.73.73 0 0 1-.534.225.67.67 0 0 1-.516-.225z"
    />
  </svg>
);
export default SvgBtnFestivalDelete;
