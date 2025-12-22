import { lazy, Suspense } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import App from '../../App';
import type { MenuOption } from '../types/menu-option';

// Lazy loading de páginas
const HomePage = lazy(() => import('@features/home/HomePage'));
const LoginPage = lazy(() => import('@features/auth/pages/LoginPage'));
const ProductsPage = lazy(() => import('@features/products/pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('@features/products/pages/ProductDetailPage'));
const NewProductPage = lazy(() => import('@features/products/pages/NewProductPage'));
const NotFoundPage = lazy(() => import('@features/NotFoundPage'));

// Loading component
// eslint-disable-next-line react-refresh/only-export-components
const Loading = () => <div>Cargando...</div>;

// Wrapper para lazy loading
const lazyLoad = (Component: React.ComponentType) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);
export const routes: RouteObject[] = [
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        element : <Navigate to="/products" replace />,
      },
      {
        path: '/login',
        element: lazyLoad(LoginPage),
      },
      {
        path: '/products',
        element: lazyLoad(ProductsPage),
        id: 'Products',
      },
      {
        path: '/products/new',
        element: lazyLoad(NewProductPage),
      },
      {
        path: '/products/:id',
        element: lazyLoad(ProductDetailPage),
      },
      {
        path: '*',
        element: lazyLoad(NotFoundPage),
      },
    ],
  },
];

export const getMenuOptions = (): MenuOption[] => {
  const children = routes[0].children ?? [];
  return children
    .filter((route): route is RouteObject & { id: string } => 
      'id' in route && Boolean(route.id)
    )
    .map((route) => ({
      path: route.index ? '/' : (route.path as string),
      label: route.id,
    }));
};