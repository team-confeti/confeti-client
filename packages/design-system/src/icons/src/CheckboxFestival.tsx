import type { SVGProps } from 'react';
const SvgCheckboxFestival = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 22 22"
    {...props}
  >
    <rect width={21} height={21} x={0.5} y={0.5} fill="#F9FAFE" rx={10.5} />
    <rect width={21} height={21} x={0.5} y={0.5} stroke="#C5C6CB" rx={10.5} />
    <path
      fill="#D9DADD"
      d="M9.366 14.717a.7.7 0 0 1-.25-.042.6.6 0 0 1-.216-.142l-2.867-2.866a.62.62 0 0 1-.175-.476.67.67 0 0 1 .192-.474.63.63 0 0 1 .466-.184q.285 0 .467.184L9.366 13.1l5.65-5.65a.64.64 0 0 1 .476-.183q.291 0 .474.183.184.183.184.475a.64.64 0 0 1-.184.475l-6.133 6.133a.6.6 0 0 1-.217.142.7.7 0 0 1-.25.042"
    />
  </svg>
);
export default SvgCheckboxFestival;
