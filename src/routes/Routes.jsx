import { createBrowserRouter } from 'react-router';
import RootLayouts from '../layouts/RootLayouts';
import HomePage from '../pages/HomePage';
import AllProductsPage from '../pages/AllProductsPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import MyProductsPage from '../pages/MyProductsPage';
import MyBidsPage from '../pages/MyBidsPage';
import CreateProductPage from '../pages/CreateProductPage';
import PrivetRoute from './PrivetRoute';

const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayouts,
    children: [
      { index: true, Component: HomePage },
      { path: 'products', Component: AllProductsPage },
      { path: 'login', Component: LoginPage },
      {
        path: 'register',
        Component: RegisterPage,
      },
      {
        path: 'my-products',
        element: (
          <PrivetRoute>
            <MyProductsPage></MyProductsPage>
          </PrivetRoute>
        ),
      },
      {
        path: '/my-bids',
        element: (
          <PrivetRoute>
            <MyBidsPage></MyBidsPage>
          </PrivetRoute>
        ),
      },
      {
        path: '/create-product',
        element: (
          <PrivetRoute>
            <CreateProductPage></CreateProductPage>
          </PrivetRoute>
        ),
      },
    ],
  },
]);

export default router;
