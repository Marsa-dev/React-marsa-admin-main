import { callAPi, callAPiMultiPart } from './http-common';

const get = () => callAPi.get('/destination');
const getbyid = (id) => callAPi.get(`/destination/${id}`);
const deletes = (id) => callAPi.delete(`/destination/${id}`);
const create = (data) => callAPiMultiPart.post('/destination', data);
const update = (id, data) => callAPiMultiPart.patch(`/destination/${id}`, data);

const DestinationService = {
  get,
  getbyid,
  deletes,
  create,
  update,
};
export default DestinationService;
