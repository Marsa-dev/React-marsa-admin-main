import { useState } from 'react';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// @mui
import { Stack, IconButton, InputAdornment, TextField, Divider, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import UsersServices from '../../../redux/api/UsersServices';

// ----------------------------------------------------------------------

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [disableComponent, setDisableComponent] = useState(true);
  const [disableEmailComponent, setDisableEmailComponent] = useState(false);
  const [forgotPasswordOtp, setForgotPasswordOtp] = useState('');
  const [password, setPassword] = useState(null);
  const [confirmPassword, setconfirmPassword] = useState(null);
  const handleClick = async () => {
    const data = {
      email: location.state.emailID,
      otp: forgotPasswordOtp,
    };
    await UsersServices.otp(data)
      .then((res) => {
        if (res?.data?.success === true) {
          toast.success(res?.data?.message);
          setDisableComponent(false);
          setDisableEmailComponent(true);
        }
      })
      .catch((err) => {
        if (!err?.response?.data) {
          toast.error(err.message);
          return;
        }
        toast.error(err?.response?.data?.message);
      });
  };
  const handleResetPasswordClick = async () => {
    const data = {
      email: location.state.emailID,
      password,
      confirmPassword,
    };
    await UsersServices.reset(data)
      .then((res) => {
        if (res?.data?.success === true) {
          toast.success(res?.data?.message);
          setDisableComponent(true);
          setDisableEmailComponent(true);
          navigate('/login', { replace: true });
        }
      })
      .catch((err) => {
        if (!err?.response?.data) {
          toast.error(err.message);
          return;
        }
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <>
      <Stack spacing={3}>
        <MuiOtpInput
          required
          length={4}
          value={forgotPasswordOtp}
          onChange={(e) => setForgotPasswordOtp(e)}
          TextFieldsProps={{ disabled: disableEmailComponent }}
        />
        <Typography
          variant="body1"
          sx={{ textAlign: 'right', cursor: 'pointer', color: '#2065D1', fontWeight: 'bold' }}
          onClick={async () => {
            await UsersServices.forget({ email: location.state.emailID })
              .then((res) => {
                if (res?.data?.success === true) {
                  toast.success('OTP Code resent to your Email. Please Check your Email.');
                }
              })
              .catch((err) => {
                if (!err?.response?.data) {
                  toast.error(err.message);
                  return;
                }
                toast.error(err?.response?.data?.message);
              });
          }}
        >
          Resend OTP
        </Typography>
        <LoadingButton
          disabled={disableEmailComponent}
          sx={{ marginTop: '15px' }}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={handleClick}
        >
          Send OPT
        </LoadingButton>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          AND
        </Typography>
      </Divider>

      <Stack spacing={3} sx={{ marginTop: '15px' }}>
        <TextField
          name="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
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
        <TextField
          name="confirmPassword"
          label="Confirm Password"
          onChange={(e) => setconfirmPassword(e.target.value)}
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
      <LoadingButton
        disabled={disableComponent}
        sx={{ marginTop: '15px' }}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleResetPasswordClick}
      >
        Reset Password
      </LoadingButton>
    </>
  );
}
