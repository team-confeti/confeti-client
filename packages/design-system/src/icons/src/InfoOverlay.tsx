import type { SVGProps } from 'react';
const SvgInfoOverlay = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 300 200"
    {...props}
  >
    <path
      fill="url(#Info_overlay_svg__a)"
      fillOpacity={0.8}
      d="M0 0h300v200H0z"
    />
    <defs>
      <linearGradient
        id="Info_overlay_svg__a"
        x1={150}
        x2={150}
        y1={0}
        y2={200}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopOpacity={0} />
        <stop offset={1} />
      </linearGradient>
    </defs>
  </svg>
);
export default SvgInfoOverlay;
