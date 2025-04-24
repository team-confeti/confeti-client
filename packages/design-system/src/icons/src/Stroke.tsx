import type { SVGProps } from 'react';
const SvgStroke = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 1 16"
    {...props}
  >
    <path
      fill="#C5C6CB"
      fillRule="evenodd"
      d="M.5 16V0H1v16z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgStroke;
