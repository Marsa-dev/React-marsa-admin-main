import activitySlice from './activitySlice';
import allUserSlice from './allUserSlice';
import boatSlice from './boatSlice';
import bookingSlice from './bookingSlice';
import destinationSlice from './destinationSlice';
import gallerySlice from './gallerySlice';
import userSlice from './userSlice';

export const rootReducer = {
  user: userSlice,
  allUser: allUserSlice,
  destination:destinationSlice,
  activity:activitySlice,
  gallery:gallerySlice,
  boat:boatSlice,
  booking:bookingSlice
};
