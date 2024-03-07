import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
// @mui
import { Card, Stack, Container, Typography, Grid, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import BoatService from '../../../redux/api/BoatService';
import { getAllBoat } from '../../../redux/slice/boatSlice';
import { IMAGE_BASEURL } from '../../../redux/api/http-common';

export default function BoatDetailPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetail] = useState({});

  useEffect(() => {
    getDeatail();
  }, [id]);

  const getDeatail = async () => {
    await BoatService.getbyid(id)
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
  const handleVerify = async () => {
    await BoatService.verify(id)
      .then((res) => {
        toast.success(res.data.message);
        getDeatail();
        dispatch(getAllBoat());
      })
      .catch((error) => {
        if (!error.response.data) {
          toast.error(error.message);
        } else {
          toast.error(error.response.data.message);
        }
      });
  };

  return (
    <>
      <Helmet>
        <title> Boat Details | Marsa </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Boat Details
          </Typography>
        </Stack>
        <Card sx={{ padding: '20px' }}>
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
                    Object.keys(details?.boatId).length === 0||
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
          <Grid container spacing={2} mt={4}>
            {/* <Grid item xs={12}>
              <Typography variant="h4" sx={{ textDecoration: 'underline', color: '#00008B' }}>
                Captain Information
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Name</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ color: 'gray' }}>
                {!details || Object.keys(details).length === 0 || !details?.fullName ? 'N/A' : details?.fullName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">License Issue Date</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ color: 'gray' }}>
                {!details || Object.keys(details).length === 0 || !details?.issueDate ? 'N/A' : details?.issueDate}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">License Expire Date</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ color: 'gray' }}>
                {!details || Object.keys(details).length === 0 || !details?.expireDate ? 'N/A' : details?.expireDate}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Address Line 1</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ color: 'gray' }}>
                {!details || Object.keys(details).length === 0 || !details?.addressLine1
                  ? 'N/A'
                  : details?.addressLine1}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Address Line 2</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ color: 'gray' }}>
                {!details || Object.keys(details).length === 0 || !details?.addressLine2
                  ? 'N/A'
                  : details?.addressLine2}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">City</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ color: 'gray' }}>
                {!details || Object.keys(details).length === 0 || !details?.city ? 'N/A' : details?.city}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">State</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ color: 'gray' }}>
                {!details || Object.keys(details).length === 0 || !details?.state ? 'N/A' : details?.state}
              </Typography>
            </Grid> */}
            <Grid item xs={12} md={12}>
              <Typography variant="h6">Please Click to View License File</Typography>
            </Grid>
            {!details ||
            Object.keys(details).length === 0 ||
            !details?.licenseImage ||
            details?.licenseImage.length === 0
              ? null
              : details?.licenseImage.map((item, index) => (
                  <Grid item xs={12} md={3} key={index}>
                    <a href={IMAGE_BASEURL + item} target="_blank" rel="noreferrer">
                      Click to View
                    </a>
                  </Grid>
                ))}
          </Grid>
          <Grid item xs={12} marginY={'20px'}>
            {!details ||
            Object.keys(details).length === 0 ||
            !details?.boatId ||
            Object.keys(details?.boatId).length === 0 ? null : (
              <Button
                variant="contained"
                onClick={() => {
                  handleVerify();
                }}
              >
                {details?.boatId?.status === false ? 'Verify' : 'Block'}
              </Button>
            )}
          </Grid>
        </Card>
      </Container>
    </>
  );
}
