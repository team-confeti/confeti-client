import type { SVGProps } from 'react';
const SvgIcHeart = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 14 14"
    {...props}
  >
    <g clipPath="url(#ic_heart_svg__a)">
      <path
        fill="#92C015"
        d="M13.422 3.431a4.1 4.1 0 0 0-.89-1.293A4.146 4.146 0 0 0 9.62.954 4.17 4.17 0 0 0 7 1.876 4.173 4.173 0 0 0 4.38.954a4.15 4.15 0 0 0-2.913 1.184A4.04 4.04 0 0 0 .25 5.023c0 .52.106 1.063.317 1.615.177.46.43.939.753 1.421.513.764 1.218 1.561 2.093 2.37a23.4 23.4 0 0 0 2.946 2.3l.37.238a.5.5 0 0 0 .54 0l.37-.237a24 24 0 0 0 2.947-2.302c.875-.808 1.58-1.605 2.092-2.369.324-.482.578-.96.753-1.421a4.5 4.5 0 0 0 .317-1.615 4 4 0 0 0-.326-1.592"
      />
    </g>
    <defs>
      <clipPath id="ic_heart_svg__a">
        <path fill="#fff" d="M0 0h14v14H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgIcHeart;
