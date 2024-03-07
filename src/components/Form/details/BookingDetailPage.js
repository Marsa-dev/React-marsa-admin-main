import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
// @mui
import { Card, Stack, Container, Typography, Grid, Button, Avatar } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { IMAGE_BASEURL } from '../../../redux/api/http-common';
import BookingService from '../../../redux/api/BookingService';

export default function BookingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetail] = useState({});

  useEffect(() => {
    getDeatail();
  }, [id]);

  const getDeatail = async () => {
    await BookingService.getbyid(id)
      .then((res) => {
        setDetail(!res?.data?.data ? {} : res?.data?.data);
      })
      .catch((err) => {
        if (!err?.response?.data) {
          console.error(err.message);
          return;
        }
        console.error(err?.response?.data?.message);
      });
  };

  return (
    <>
      <Helmet>
        <title> Booking Details | Marsa </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Booking Details
          </Typography>
        </Stack>
        <Card sx={{ padding: '20px' }}>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12}>
              <Typography variant="h4" sx={{ textDecoration: 'underline', color: '#00008B' }}>
                User Information
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Name</Typography>
            </Grid>
            <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Avatar
                src={
                  IMAGE_BASEURL +
                  (!details ||
                  Object.keys(details).length === 0 ||
                  !details?.userId ||
                  Object.keys(details?.userId).length === 0 ||
                  !details?.userId?.profilePic
                    ? null
                    : details?.userId?.profilePic)
                }
                alt={
                  !details ||
                  Object.keys(details).length === 0 ||
                  !details?.userId ||
                  Object.keys(details?.userId).length === 0 ||
                  !details?.userId?.fullName
                    ? 'N/A'
                    : details?.userId?.fullName
                }
                sx={{ width: '100px', height: '100px' }}
              />
              <Typography variant="h6" sx={{ color: 'gray', marginLeft: '10px' }}>
                {!details ||
                Object.keys(details).length === 0 ||
                !details?.userId ||
                Object.keys(details?.userId).length === 0 ||
                !details?.userId?.fullName
                  ? 'N/A'
                  : details?.userId?.fullName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Email</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ color: 'gray' }}>
                {!details ||
                Object.keys(details).length === 0 ||
                !details?.userId ||
                Object.keys(details?.userId).length === 0 ||
                !details?.userId?.email
                  ? 'N/A'
                  : details?.userId?.email}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" sx={{ textDecoration: 'underline', color: '#00008B' }}>
                Boat Information
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Name</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ color: 'gray' }}>
                {!details ||
                Object.keys(details).length === 0 ||
                !details?.boatId ||
                Object.keys(details?.boatId).length === 0 ||
                !details?.boatId?.craftName
                  ? 'N/A'
                  : details?.boatId?.craftName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Boat Type</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ color: 'gray' }}>
                {!details ||
                Object.keys(details).length === 0 ||
                !details?.boatId ||
                Object.keys(details?.boatId).length === 0 ||
                !details?.boatId?.boatType
                  ? 'N/A'
                  : details?.boatId?.boatType}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Type Of Craft Type</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ color: 'gray' }}>
                {!details ||
                Object.keys(details).length === 0 ||
                !details?.boatId ||
                Object.keys(details?.boatId).length === 0 ||
                !details?.boatId?.typeOfCraftType ||
                details?.boatId?.typeOfCraftType.length === 0
                  ? 'N/A'
                  : details?.boatId?.typeOfCraftType.join(', ')}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Water Craft Type</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ color: 'gray' }}>
                {!details ||
                Object.keys(details).length === 0 ||
                !details?.boatId ||
                Object.keys(details?.boatId).length === 0 ||
                !details?.boatId?.waterCraftType
                  ? 'N/A'
                  : details?.boatId?.waterCraftType}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Rent Per Hour</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ color: 'gray' }}>
                {!details ||
                Object.keys(details).length === 0 ||
                !details?.boatId ||
                Object.keys(details?.boatId).length === 0 ||
                !details?.boatId?.rentPerHour
                  ? 'N/A'
                  : details?.boatId?.rentPerHour}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Guest Capicty</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ color: 'gray' }}>
                {!details ||
                Object.keys(details).length === 0 ||
                !details?.boatId ||
                Object.keys(details?.boatId).length === 0 ||
                !details?.boatId?.guestCapicty
                  ? 'N/A'
                  : details?.boatId?.guestCapicty}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Max Hour</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ color: 'gray' }}>
                {!details ||
                Object.keys(details).length === 0 ||
                !details?.boatId ||
                Object.keys(details?.boatId).length === 0 ||
                !details?.boatId?.maxHour
                  ? 'N/A'
                  : details?.boatId?.maxHour}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Min Hour</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ color: 'gray' }}>
                {!details ||
                Object.keys(details).length === 0 ||
                !details?.boatId ||
                Object.keys(details?.boatId).length === 0 ||
                !details?.boatId?.minHour
                  ? 'N/A'
                  : details?.boatId?.minHour}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Experience</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ color: 'gray' }}>
                {!details ||
                Object.keys(details).length === 0 ||
                !details?.boatId ||
                Object.keys(details?.boatId).length === 0 ||
                !details?.boatId?.experience
                  ? 'N/A'
                  : details?.boatId?.experience}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">LOA</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ color: 'gray' }}>
                {!details ||
                Object.keys(details).length === 0 ||
                !details?.boatId ||
                Object.keys(details?.boatId).length === 0 ||
                !details?.boatId?.loa
                  ? 'N/A'
                  : details?.boatId?.loa}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Resume</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ color: 'gray' }}>
                {!details ||
                Object.keys(details).length === 0 ||
                !details?.boatId ||
                Object.keys(details?.boatId).length === 0 ||
                !details?.boatId?.resume
                  ? 'N/A'
                  : details?.boatId?.resume}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Verified Status</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography
                variant="h6"
                sx={{
                  color:
                    !details ||
                    Object.keys(details).length === 0 ||
                    !details?.boatId ||
                    Object.keys(details?.boatId).length === 0 ||
                    details?.boatId?.status === false
                      ? 'red'
                      : 'green',
                }}
              >
                {!details ||
                Object.keys(details).length === 0 ||
                !details?.boatId ||
                Object.keys(details?.boatId).length === 0
                  ? 'N/A'
                  : details?.boatId?.status === false
                  ? 'Not Verified'
                  : 'Verified'}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Description</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!details ||
                Object.keys(details).length === 0 ||
                !details?.boatId ||
                Object.keys(details?.boatId).length === 0 ||
                !details?.boatId?.description
                  ? 'N/A'
                  : details?.boatId?.description}
              </Typography>
            </Grid>
            {!details ||
            Object.keys(details).length === 0 ||
            !details?.boatId ||
            Object.keys(details?.boatId).length === 0 ||
            !details?.boatId?.images ||
            details?.boatId?.images.length === 0
              ? null
              : details?.boatId?.images.map((item, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <img src={IMAGE_BASEURL + item} alt={index} height={'200px'} width={'100%'} />
                  </Grid>
                ))}
          </Grid>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12}>
              <Typography variant="h4" sx={{ textDecoration: 'underline', color: '#00008B' }}>
                Booking Information
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Booking Start Time</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ color: 'gray' }}>
                {!details || Object.keys(details).length === 0 || !details?.bookingStartTime
                  ? 'N/A'
                  : new Date(details?.bookingStartTime).toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Booking End Time</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ color: 'gray' }}>
                {!details || Object.keys(details).length === 0 || !details?.bookingEndTime
                  ? 'N/A'
                  : new Date(details?.bookingEndTime).toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Destination</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ color: 'gray' }}>
                {!details || Object.keys(details).length === 0 || !details?.destination ? 'N/A' : details?.destination}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Guest No</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ color: 'gray' }}>
                {!details || Object.keys(details).length === 0 || !details?.guestNo ? 'N/A' : details?.guestNo}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Hours</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ color: 'gray' }}>
                {!details || Object.keys(details).length === 0 || !details?.hours ? 'N/A' : details?.hours}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Status</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography
                variant="h6"
                sx={{
                  color:
                    !details || Object.keys(details).length === 0 || details?.status === 'rejected' ? 'red' : 'green',
                }}
              >
                {!details || Object.keys(details).length === 0 || !details?.status ? 'N/A' : details?.status}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Comment</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ color: 'gray' }}>
                {!details || Object.keys(details).length === 0 || !details?.comment ? 'N/A' : details?.comment}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} marginY={'20px'}>
            <Button variant="contained" onClick={() => navigate('/dashboard/booking')}>
              Back
            </Button>
          </Grid>
        </Card>
      </Container>
    </>
  );
}
