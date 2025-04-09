import type { SVGProps } from 'react';
const SvgCmpProfileNon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 80 80"
    {...props}
  >
    <rect width={80} height={80} fill="#fff" rx={40} />
    <path
      fill="#EFF0F4"
      fillRule="evenodd"
      d="m52.957 17.746-6.978 6.995V15h-12.56v9.74l-6.755-6.77-8.89 8.895 6.564 6.58H15v5.752h18.866c1.206 0 2.412-.294 3.36-1.054 2.395-1.9 2.809-5.561 2.809-12.59 0 7.029.413 10.69 2.808 12.59.947.743 2.17 1.054 3.36 1.054h18.78V33.6l-.155-.155H55.04l6.789-6.805-8.89-8.912zM65 40.786H46.616c-.81 0-1.637.155-2.377.483-3.636 1.641-4.187 5.165-4.187 13.368 0-5.216-.758-8.773-1.999-11.001-1.017-1.814-2.998-2.85-5.083-2.85H15v5.267h9.717l-6.909 6.926 8.89 8.912 6.72-6.736V65h12.56v-9.845l7.134 7.15h.034l8.856-8.894-7.323-7.34H65v-5.285"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgCmpProfileNon;
