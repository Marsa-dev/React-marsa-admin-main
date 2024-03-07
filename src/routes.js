import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import DestinationsPage from './pages/DestinationsPage';
import ActivitiesPage from './pages/ActivitiesPage';
import OrdersPage from './pages/OrdersPage';
import PaymentsPage from './pages/PaymentsPage';
import AddDestinationPage from './components/Form/Add/AddDestinationPage';
import AddActivityPage from './components/Form/Add/AddActivityPage';
import EditDestinationPage from './components/Form/Edit/EditDestinationPage';
import EditActivityPage from './components/Form/Edit/EditActivityPage';
import GalleryPage from './pages/GalleryPage';
import BoatPage from './pages/BoatPage';
import BoatDetailPage from './components/Form/details/BoatDetailPage';
import BookingDetailPage from './components/Form/details/BookingDetailPage';
import Terms from './components/terms/Terms';
import Privacy from './components/privacy/Privacy';
import ForgetPasswordPage from './pages/ForgetPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'destinations', element: <DestinationsPage /> },
        { path: 'destinations/add-destination', element: <AddDestinationPage /> },
        { path: 'destinations/edit-destination/:id', element: <EditDestinationPage /> },
        { path: 'activities', element: <ActivitiesPage /> },
        { path: 'activities/add-activity', element: <AddActivityPage /> },
        { path: 'activities/edit-activity/:id', element: <EditActivityPage /> },
        { path: 'booking', element: <OrdersPage /> },
        { path: 'booking/detail/:id', element: <BookingDetailPage /> },
        { path: 'gallery', element: <GalleryPage /> },
        { path: 'boats', element: <BoatPage /> },
        { path: 'boats/detail/:id', element: <BoatDetailPage /> },
        { path: 'payments', element: <PaymentsPage /> },
        { path: 'terms', element: <Terms /> },
        { path: 'privacy', element: <Privacy /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'forget-password',
      element: <ForgetPasswordPage />,
    },
    {
      path: 'otp-reset-password',
      element: <ResetPasswordPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
