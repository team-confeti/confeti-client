import type { SVGProps } from 'react';
const SvgBtnRadioActive = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <rect width={20} height={20} fill="#B5F602" rx={10} />
    <circle cx={10} cy={10} r={5} fill="#fff" />
  </svg>
);
export default SvgBtnRadioActive;
