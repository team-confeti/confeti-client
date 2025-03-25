import type { SVGProps } from 'react';
const SvgBtnKebabActive = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 42 42"
    {...props}
  >
    <g filter="url(#btn_kebab_active_svg__a)">
      <rect width={30} height={30} x={6} y={6} fill="#F9FAFE" rx={5} />
      <rect width={29} height={29} x={6.5} y={6.5} stroke="#92C015" rx={4.5} />
      <circle cx={21} cy={14} r={1.5} fill="#92C015" />
      <circle cx={21} cy={21} r={1.5} fill="#92C015" />
      <circle cx={21} cy={28} r={1.5} fill="#92C015" />
    </g>
    <defs>
      <filter
        id="btn_kebab_active_svg__a"
        width={42}
        height={42}
        x={0}
        y={0}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={3} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_5013_23354"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_5013_23354"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgBtnKebabActive;
