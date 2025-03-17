import type { SVGProps } from 'react';
const SvgImgDday03 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 200 200"
    {...props}
  >
    <g clipPath="url(#img_dday03_svg__a)">
      <path fill="url(#img_dday03_svg__b)" d="M0 0h200v200H0z" />
      <circle cx={58} cy={186} r={94} fill="url(#img_dday03_svg__c)" />
      <circle cx={149} cy={56} r={94} fill="url(#img_dday03_svg__d)" />
    </g>
    <defs>
      <linearGradient
        id="img_dday03_svg__b"
        x1={0.273}
        x2={199.727}
        y1={0}
        y2={200}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2A9781" />
        <stop offset={1} stopColor="#7CDDCA" />
      </linearGradient>
      <linearGradient
        id="img_dday03_svg__c"
        x1={101.5}
        x2={-209.5}
        y1={136}
        y2={732.5}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#39B99E" />
        <stop offset={1} stopColor="#fff" stopOpacity={0.05} />
      </linearGradient>
      <linearGradient
        id="img_dday03_svg__d"
        x1={192.5}
        x2={-118.5}
        y1={6}
        y2={602.5}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#39B99E" />
        <stop offset={1} stopColor="#97E7D8" />
      </linearGradient>
      <clipPath id="img_dday03_svg__a">
        <path fill="#fff" d="M0 0h200v200H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgImgDday03;
