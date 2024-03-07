import { callAPi } from './http-common';

const get = () => callAPi.get('/user/all');
const active = (id) => callAPi.post('/user/activeInactiveUser',{id});

const AllUserService = {
  get,
  active
};

export default AllUserService;
