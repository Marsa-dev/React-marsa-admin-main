import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
// @mui
import { Card, Stack, Container, Typography, TextField, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import DestinationService from '../../../redux/api/DestinationService';
import { getAllDestination } from '../../../redux/slice/destinationSlice';

const initialValues = {
  title: '',
  description: '',
};
export default function EditDestinationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [image, setimage] = useState(null);
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
      await DestinationService.update(id, { ...values, image })
        .then((res) => {
          if (res?.data) {
            toast.success(res?.data?.message);
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
  useEffect(() => {
    getDetail();
  }, [id]);
  const getDetail = async () => {
    await DestinationService.getbyid(id)
      .then((res) => {
        setValues({
          title: !res?.data?.data?.title ? '' : res?.data?.data?.title,
          description: !res?.data?.data?.description ? '' : res?.data?.data?.description,
        });
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
        <title> Edit Destination | Marsa </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Edit Destination
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
            Edit
          </Button>
        </Card>
      </Container>
    </>
  );
}
