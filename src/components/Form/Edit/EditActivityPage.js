import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
// @mui
import { Card, Stack, Container, Typography, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import ActivityService from '../../../redux/api/ActivityService';
import { getAllActivity } from '../../../redux/slice/activitySlice';

const initialValues = {
  activityName: '',
  description: '',
  equipment: [''],
  price: '',
};
export default function AddActivityPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
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
    if ('activityName' in fieldValue) temp.activityName = fieldValue.activityName ? '' : 'This field requires';
    if ('description' in fieldValue) temp.description = fieldValue.description ? '' : 'This field requires';
    if (values.equipment.some((equipmentItem) => equipmentItem === '')) {
      temp.equipment = 'Equipment fields cannot be empty';
    } else {
      temp.equipment = '';
    }
    if ('price' in fieldValue) temp.price = fieldValue.price ? '' : 'This field requires';
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === '');
  };
  const handleEquipmentChange = (index, value) => {
    const newEquipment = [...values.equipment];
    newEquipment[index] = value;
    setValues({
      ...values,
      equipment: newEquipment,
    });
  };

  const handleAddEquipment = () => {
    setValues({
      ...values,
      equipment: [...values.equipment, ''], // Add an empty string for a new equipment field
    });
  };

  const handleRemoveEquipment = (index) => {
    const newEquipment = [...values.equipment];
    newEquipment.splice(index, 1); // Remove the equipment field at the specified index
    setValues({
      ...values,
      equipment: newEquipment,
    });
  };
  const handleClick = async (e) => {
    e.preventDefault();
    if (validations()) {
      await ActivityService.update(id, values)
        .then((res) => {
          if (res?.data) {
            toast.success(res?.data?.message);
            dispatch(getAllActivity());
            navigate('/dashboard/activities');
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
    getDeatail();
  }, [id]);

  const getDeatail = async () => {
    await ActivityService.getbyid(id)
      .then((res) => {
        setValues({
          activityName: !res?.data?.data?.activityName ? '' : res?.data?.data?.activityName,
          description: !res?.data?.data?.description ? '' : res?.data?.data?.description,
          equipment: !res?.data?.data?.equipment ? [''] : res?.data?.data?.equipment,
          price: !res?.data?.data?.price ? '' : res?.data?.data?.price,
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
        <title> Edit Activity | Marsa </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Edit Activity
          </Typography>
        </Stack>
        <Card sx={{ padding: '10px' }}>
          <TextField
            fullWidth
            placeholder="Activity Name"
            sx={{ marginY: '10px' }}
            name="activityName"
            error={errors.activityName}
            onChange={handleChange}
            helperText={errors.activityName}
            value={values.activityName}
          />
          {values.equipment.map((equipmentItem, index) => (
            <div key={index}>
              <TextField
                fullWidth
                placeholder="Equipment Name"
                sx={{ marginY: '10px' }}
                name={`equipment[${index}]`}
                error={errors.equipment && errors.equipment[index]}
                onChange={(e) => handleEquipmentChange(index, e.target.value)}
                helperText={errors.equipment && errors.equipment[index]}
                value={equipmentItem}
              />
              <Button onClick={() => handleRemoveEquipment(index)} variant="outlined">
                X
              </Button>
            </div>
          ))}
          <Button variant="contained" onClick={handleAddEquipment} sx={{ marginTop: '10px' }}>
            Add Equipment
          </Button>
          <TextField
            fullWidth
            placeholder="Price"
            sx={{ marginY: '10px' }}
            name="price"
            error={errors.price}
            onChange={handleChange}
            helperText={errors.price}
            value={values.price}
          />
          <TextField
            fullWidth
            multiline
            rows={5}
            placeholder="Description"
            sx={{ marginY: '10px' }}
            name="description"
            error={errors.description}
            onChange={handleChange}
            helperText={errors.description}
            value={values.description}
          />
          <Button variant="contained" onClick={handleClick} sx={{ marginTop: '10px' }}>
            Edit
          </Button>
        </Card>
      </Container>
    </>
  );
}
