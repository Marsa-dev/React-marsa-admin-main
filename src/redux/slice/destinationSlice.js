import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import DestinationService from '../api/DestinationService';

const initialValues = {
  data: [],
  loading: 'ideal',
};
export const getAllDestination = createAsyncThunk('destination/getAllDestination', async () => {
  try {
    const res = await DestinationService.get();
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

const destinationSlice = createSlice({
  name: 'destination',
  initialState: initialValues,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllDestination.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllDestination.fulfilled, (state, action) => {
      state.loading = 'ideal';
      state.data = action.payload;
    });
    builder.addCase(getAllDestination.rejected, (state) => {
      state.loading = 'rejected';
    });
  },
});

export default destinationSlice.reducer;
