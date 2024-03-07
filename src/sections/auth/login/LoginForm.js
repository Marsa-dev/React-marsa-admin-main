import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// @mui
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import UsersServices from '../../../redux/api/UsersServices';

// ----------------------------------------------------------------------
const initialValues = {
  email: '',
  password: '',
};
export default function LoginForm() {
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
    if ('password' in fieldValue) temp.password = fieldValue.password ? '' : 'This field requires';
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === '');
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    if (validations()) {
      await UsersServices.login(values)
        .then((res) => {
          if (res?.data?.data) {
            localStorage.setItem('marsa_token', res?.data?.data?.token);
            navigate('/dashboard/app');
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

        <TextField
          name="password"
          label="Password"
          error={errors.password}
          onChange={handleChange}
          helperText={errors.password}
          value={values.password}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 2 }}>
        <Link to="/forget-password">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
