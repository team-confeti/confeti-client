import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@pages/home/home-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
]);

export default router;
