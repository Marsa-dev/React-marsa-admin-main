import { callAPi } from './http-common';

const get = () => callAPi.get('/activity');
const getbyid = (id) => callAPi.get(`/activity/${id}`);
const deletes = (id) => callAPi.delete(`/activity/${id}`);
const create = (data) => callAPi.post('/activity', data);
const update = (id, data) => callAPi.patch(`/activity/${id}`, data);

const ActivityService = {
  get,
  getbyid,
  deletes,
  create,
  update,
};
export default ActivityService;
