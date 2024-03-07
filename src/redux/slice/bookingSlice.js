import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import BookingService from '../api/BookingService';

const initialValues = {
  data: [],
  loading: 'ideal',
};
export const getAllBooking = createAsyncThunk('booking/getAllBooking', async () => {
  try {
    const res = await BookingService.get();
    return res?.data?.data;
  } catch (error) {
    if (!error.response.data) {
      console.log(error.message);
    } else {
      console.log(error.response.data.message);
    }
    return error.message;
  }
});

const bookingSlice = createSlice({
  name: 'booking',
  initialState: initialValues,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllBooking.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllBooking.fulfilled, (state, action) => {
      state.loading = 'ideal';
      state.data = action.payload;
    });
    builder.addCase(getAllBooking.rejected, (state) => {
      state.loading = 'rejected';
    });
  },
});

export default bookingSlice.reducer;
