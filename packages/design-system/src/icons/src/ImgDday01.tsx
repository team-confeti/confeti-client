import type { SVGProps } from 'react';
const SvgImgDday01 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 200 200"
    {...props}
  >
    <g clipPath="url(#img_dday01_svg__a)">
      <path fill="url(#img_dday01_svg__b)" d="M0 0h200v200H0z" />
      <circle cx={58} cy={186} r={94} fill="url(#img_dday01_svg__c)" />
      <circle cx={148} cy={57} r={94} fill="url(#img_dday01_svg__d)" />
    </g>
    <defs>
      <linearGradient
        id="img_dday01_svg__b"
        x1={0.273}
        x2={199.727}
        y1={0}
        y2={200}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#221963" />
        <stop offset={1} stopColor="#5B2FDF" />
      </linearGradient>
      <linearGradient
        id="img_dday01_svg__c"
        x1={101.5}
        x2={-209.5}
        y1={136}
        y2={732.5}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3D2AB8" />
        <stop offset={1} stopColor="#fff" stopOpacity={0.05} />
      </linearGradient>
      <linearGradient
        id="img_dday01_svg__d"
        x1={191.5}
        x2={72}
        y1={7}
        y2={202.5}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#5A42F3" />
        <stop offset={1} stopColor="#4533BC" />
      </linearGradient>
      <clipPath id="img_dday01_svg__a">
        <path fill="#fff" d="M0 0h200v200H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgImgDday01;
