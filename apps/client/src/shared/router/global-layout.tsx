import { Outlet } from 'react-router-dom';
import { Header } from '@confeti/design-system';

export default function GlobalLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
