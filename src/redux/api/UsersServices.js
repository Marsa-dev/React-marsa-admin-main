import { callAPi } from './http-common';

const login = (data) => callAPi.post('/auth/login', data);
const get = () => callAPi.get('/user/me');
const forget = (data) => callAPi.post('/auth/admin/forgot-password', data);
const otp = (data) => callAPi.post('/auth/admin/verify-forgot-password', data);
const reset = (data) => callAPi.post('/auth/admin/reset-password', data);

const UsersServices = {
  login,
  get,
  forget,
  reset,
  otp
};

export default UsersServices;
