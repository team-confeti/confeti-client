import type { SVGProps } from 'react';
const SvgBtnFloating = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 50 51"
    {...props}
  >
    <g filter="url(#btn_floating_svg__a)">
      <rect width={40} height={40} x={5} y={3} fill="#B5F602" rx={20} />
      <path
        fill="#000"
        d="M18.375 26.375q-.344-.345-.344-.875 0-.531.344-.875l5.75-5.75q.187-.187.406-.267.219-.077.469-.077t.485.094q.234.093.39.25l5.75 5.75q.345.343.344.875 0 .531-.344.875t-.875.343-.875-.343L25 21.5l-4.875 4.875q-.344.343-.875.343t-.875-.343"
      />
    </g>
    <defs>
      <filter
        id="btn_floating_svg__a"
        width={50}
        height={50}
        x={0}
        y={0.5}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={2.5} />
        <feGaussianBlur stdDeviation={2.5} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_754_10810"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_754_10810"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgBtnFloating;
