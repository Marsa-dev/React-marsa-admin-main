import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// @mui
import { styled } from '@mui/material/styles';
//
import Header from './header';
import Nav from './nav';
import { getUser } from '../../redux/slice/userSlice';
import { getAllUser } from '../../redux/slice/allUserSlice';
import { getAllDestination } from '../../redux/slice/destinationSlice';
import { getAllActivity } from '../../redux/slice/activitySlice';
import { getAllGallery } from '../../redux/slice/gallerySlice';
import { getAllBoat } from '../../redux/slice/boatSlice';
import { getAllBooking } from '../../redux/slice/bookingSlice';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const dipatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('marsa_token')) {
      navigate('/login');
    }
  }, [localStorage.getItem('marsa_token')]);
  useEffect(() => {
    dipatch(getUser());
    dipatch(getAllUser());
    dipatch(getAllDestination());
    dipatch(getAllActivity());
    dipatch(getAllGallery());
    dipatch(getAllBoat());
    dipatch(getAllBooking());
  }, [dipatch]);

  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />

      <Nav openNav={open} onCloseNav={() => setOpen(false)} />

      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  );
}
