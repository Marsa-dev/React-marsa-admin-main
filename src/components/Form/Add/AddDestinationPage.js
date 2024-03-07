import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Card, Stack, Container, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import DestinationService from '../../../redux/api/DestinationService';
import { getAllDestination } from '../../../redux/slice/destinationSlice';

const initialValues = {
  title: '',
  description: '',
};
export default function AddDestinationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [image, setimage] = useState(null);
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const validations = (fieldValue = values) => {
    const temp = { ...errors };
    if ('title' in fieldValue) temp.title = fieldValue.title ? '' : 'This field requires';
    if ('description' in fieldValue) temp.description = fieldValue.description ? '' : 'This field requires';
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === '');
  };
  const handleClick = async (e) => {
    e.preventDefault();
    if (validations()) {
      await DestinationService.create({ ...values, image })
        .then((res) => {
          if (res?.data?.data) {
            toast.success('Destination created successfully');
            setValues(initialValues);
            dispatch(getAllDestination());
            navigate('/dashboard/destinations');
          }
        })
        .catch((err) => {
          if (!err?.response?.data) {
            toast.error(err.message);
            return;
          }
          toast.error(err?.response?.data?.message);
        });
    }
  };
  return (
    <>
      <Helmet>
        <title> Add Destination | Marsa </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Add Destination
          </Typography>
        </Stack>
        <Card sx={{ padding: '10px' }}>
          <Typography variant="body1">Title</Typography>
          <TextField
            placeholder="Enter Destination"
            fullWidth
            name="title"
            error={errors.title}
            onChange={handleChange}
            helperText={errors.title}
            value={values.title}
          />
          <br />
          <br />
          <Typography variant="body1">Description</Typography>
          <TextField
            placeholder="Enter Description"
            fullWidth
            name="description"
            multiline
            rows={5}
            error={errors.description}
            onChange={handleChange}
            helperText={errors.description}
            value={values.description}
          />
          <br />
          <br />
          <input type="file" accept="image/*" onClick={(e) => setimage(e.target.files[0])} />
          <br />
          <Button variant="contained" onClick={handleClick} sx={{ marginTop: '10px' }}>
            Save
          </Button>
        </Card>
      </Container>
    </>
  );
}
