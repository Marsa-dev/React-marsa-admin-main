import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
// sections
import { AppWidgetSummary } from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const boatData = useSelector((state) => state.boat.data);
  const userData = useSelector((state) => state?.allUser?.data);
  const bookingData = useSelector((state) => state?.booking?.data);

  return (
    <>
      <Helmet>
        <title> Dashboard | Marsa </title>
      </Helmet>
      {localStorage.getItem('marsa_token') && (
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 5 }}>
            Hi, Welcome back
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Total Users"
                total={!userData || userData.length === 0 ? 0 : Number(userData.length)}
                icon={'carbon:user-filled'}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Total Bookings"
                total={!bookingData || bookingData.length === 0 ? 0 : Number(bookingData.length)}
                color="info"
                icon={'uil:calender'}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Total Boats"
                total={!boatData || boatData.length === 0 ? 0 : Number(boatData.length)}
                color="warning"
                icon={'emojione-monotone:motor-boat'}
              />
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
}
