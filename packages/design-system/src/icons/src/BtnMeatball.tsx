import type { SVGProps } from 'react';
const SvgBtnMeatball = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 30 30"
    {...props}
  >
    <rect width={30} height={30} fill="#fff" rx={5} />
    <rect width={29} height={29} x={0.5} y={0.5} stroke="#EFF0F4" rx={4.5} />
    <circle cx={15} cy={8} r={1.5} fill="#92C015" />
    <circle cx={15} cy={15} r={1.5} fill="#92C015" />
    <circle cx={15} cy={22} r={1.5} fill="#92C015" />
  </svg>
);
export default SvgBtnMeatball;
