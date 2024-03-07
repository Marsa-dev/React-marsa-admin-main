// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Boats',
    path: '/dashboard/boats',
    icon: icon('boat-1-svgrepo-com'),
  },
  {
    title: 'Destinations',
    path: '/dashboard/destinations',
    icon: icon('destination-1-svgrepo-com'),
  },
  {
    title: 'Activities',
    path: '/dashboard/activities',
    icon: icon('activity-manager-svgrepo-com'),
  },
  {
    title: 'Gallery',
    path: '/dashboard/gallery',
    icon: icon('gallery-svgrepo-com'),
  },
  {
    title: 'Bookings',
    path: '/dashboard/booking',
    icon: icon('calendar-svgrepo-com'),
  },

  {
    title: 'Terms and Conditions',
    path: '/dashboard/terms',
    icon: icon('ic_terms'),
  },
  {
    title: 'Privacy Policy',
    path: '/dashboard/privacy',
    icon: icon('ic_privacy'),
  },
];

export const publicnavConfig = [
  {
    title: 'Terms and Conditions',
    path: '/dashboard/terms',
    icon: icon('ic_terms'),
  },
  {
    title: 'Privacy Policy',
    path: '/dashboard/privacy',
    icon: icon('ic_privacy'),
  },
];

export default navConfig;
