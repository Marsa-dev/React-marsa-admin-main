import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// @mui
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import UsersServices from '../../../redux/api/UsersServices';

// ----------------------------------------------------------------------
const initialValues = {
  email: '',
};
export default function ForgetPassword() {
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
    if ('email' in fieldValue) temp.email = fieldValue.email ? '' : 'This field requires';
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === '');
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (validations()) {
      await UsersServices.forget(values)
        .then((res) => {
          if (res?.data?.success === true) {
            toast.success('OTP Code Sent to your Email. Please Check your Email.');
            navigate('/otp-reset-password', { state: { emailID: values?.email } });
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
      <Stack spacing={3} sx={{ my: 2 }}>
        <TextField
          label="Email address"
          name="email"
          error={errors.email}
          onChange={handleChange}
          helperText={errors.email}
          value={values.email}
        />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Forget Password
      </LoadingButton>
    </>
  );
}
