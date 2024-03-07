import { callAPi } from './http-common';

const get = () => callAPi.get('/boat');
const getbyid = (id) => callAPi.get(`/captain/boat/${id}`);
const deletes = (id) => callAPi.delete(`/boat/${id}`);
const verify = (id) => callAPi.post(`/boat/activeInactiveBoat/${id}`);
const slider = (id) => callAPi.post(`/boat/slider/${id}`);

const BoatService = {
  get,
  getbyid,
  deletes,
  verify,
  slider
};
export default BoatService;
