import type { SVGProps } from 'react';
const SvgBtnKakaoActive = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 30 30"
    {...props}
  >
    <rect width={30} height={30} fill="#FBDE4B" rx={15} />
    <path
      fill="#212224"
      d="M15 7.211c5.072 0 9.183 3.204 9.183 7.158 0 3.953-4.11 7.157-9.182 7.157q-.759-.002-1.51-.096l-3.855 2.52c-.438.232-.593.207-.413-.36l.78-3.217c-2.518-1.277-4.184-3.49-4.184-6.004 0-3.953 4.11-7.158 9.182-7.158"
    />
  </svg>
);
export default SvgBtnKakaoActive;
