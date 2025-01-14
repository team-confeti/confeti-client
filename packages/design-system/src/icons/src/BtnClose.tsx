import { forwardRef } from 'react';
import type { SVGProps } from 'react';

const SvgBtnClose = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="none"
      viewBox="0 0 18 19"
      ref={ref} // Forward the ref here
      {...props}
    >
      <g clipPath="url(#btn_close_svga)">
        <circle cx={9} cy={9.3} r={9} fill="#93959D" />
        <path
          fill="#fff"
          d="m9 10.35-2.174 2.175a.71.71 0 0 1-.525.206.71.71 0 0 1-.525-.207.7.7 0 0 1-.207-.524q0-.32.207-.525L7.95 9.299 5.776 7.143a.71.71 0 0 1-.207-.525q0-.318.207-.525a.71.71 0 0 1 .525-.206q.318 0 .525.206L9 8.268l2.156-2.175a.71.71 0 0 1 .525-.206q.318 0 .525.206a.73.73 0 0 1 .225.535.67.67 0 0 1-.225.515L10.032 9.3l2.175 2.176a.7.7 0 0 1 .206.524.71.71 0 0 1-.206.525.73.73 0 0 1-.535.226.67.67 0 0 1-.515-.226z"
        />
      </g>
      <defs>
        <clipPath id="btn_close_svga">
          <path fill="#fff" d="M0 .3h18v18H0z" />
        </clipPath>
      </defs>
    </svg>
  ),
);

export default SvgBtnClose;
