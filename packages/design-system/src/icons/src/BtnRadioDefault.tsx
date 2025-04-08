import type { SVGProps } from 'react';
const SvgBtnRadioDefault = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <circle cx={10} cy={10} r={9.25} stroke="#C5C6CB" strokeWidth={1.5} />
  </svg>
);
export default SvgBtnRadioDefault;
