import { callAPi, callAPiMultiPart } from './http-common';

const get = () => callAPi.get('/gallery');
const deletes = (id) => callAPi.delete(`/gallery/${id}`);
const create = (data) => callAPiMultiPart.post('/gallery', data);

const GalleryService = {
  get,
  deletes,
  create,
};
export default GalleryService;
