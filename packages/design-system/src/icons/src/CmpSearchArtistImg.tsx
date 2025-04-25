import type { SVGProps } from 'react';
const SvgCmpSearchArtistImg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 30 30"
    {...props}
  >
    <g clipPath="url(#cmp_search_artist_img_svg__a)">
      <rect width={30} height={30} fill="#fff" rx={15} />
      <path fill="#D9DADD" d="M0 0h30v30H0z" />
      <g clipPath="url(#cmp_search_artist_img_svg__b)">
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M19.485 6.976 17.006 9.46V6h-4.462v3.46l-2.4-2.405-3.158 3.16 2.332 2.338H6v2.044h6.703c.428 0 .857-.105 1.194-.375.85-.675.997-1.976.997-4.473 0 2.497.147 3.798.998 4.473.337.264.771.375 1.194.375h6.672v-1.988l-.055-.056h-3.477l2.412-2.417-3.159-3.166zm4.279 8.185h-6.531c-.288 0-.582.055-.845.172-1.292.583-1.488 1.835-1.488 4.75 0-1.854-.269-3.118-.71-3.91-.36-.644-1.065-1.012-1.806-1.012H6v1.872h3.452l-2.454 2.46 3.158 3.167 2.388-2.394v3.498h4.462v-3.498l2.534 2.54h.012l3.147-3.16-2.602-2.607h3.667V15.16"
          clipRule="evenodd"
        />
      </g>
    </g>
    <defs>
      <clipPath id="cmp_search_artist_img_svg__a">
        <rect width={30} height={30} fill="#fff" rx={15} />
      </clipPath>
      <clipPath id="cmp_search_artist_img_svg__b">
        <path fill="#fff" d="M6 6h18v18H6z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgCmpSearchArtistImg;
