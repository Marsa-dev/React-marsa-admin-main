import { callAPi } from './http-common';

const get = () => callAPi.get('/booking/all/bookings');
const getbyid = (id) => callAPi.get(`/booking/${id}`);
const deletes = (id) => callAPi.delete(`/boat/${id}`);
const verify = (id) => callAPi.post(`/boat/activeInactiveBoat/${id}`);

const BookingService = {
  get,
  getbyid,
  deletes,
  verify,
};
export default BookingService;
