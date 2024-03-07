import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ActivityService from '../api/ActivityService';

const initialValues = {
  data: [],
  loading: 'ideal',
};
export const getAllActivity= createAsyncThunk('activity/getAllActivity', async () => {
  try {
    const res = await ActivityService.get();
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

const activitySlice = createSlice({
  name: 'activity',
  initialState: initialValues,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllActivity.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllActivity.fulfilled, (state, action) => {
      state.loading = 'ideal';
      state.data = action.payload;
    });
    builder.addCase(getAllActivity.rejected, (state) => {
      state.loading = 'rejected';
    });
  },
});

export default activitySlice.reducer;
