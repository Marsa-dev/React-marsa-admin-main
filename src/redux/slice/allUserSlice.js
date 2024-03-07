import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AllUserService from '../api/AllUserService';

export const initialState = {
  data: [],
  loading: 'idle',
  error: null,
  message: null,
};

export const getAllUser = createAsyncThunk('alluser/getAllUser', async () => {
  try {
    const res = await AllUserService.get();
    return res?.data?.data;
  } catch (error) {
    if (!error.response.data) {
      console.error(error.message);
    } else {
      console.error(error.response.data.message);
    }
    return error.message;
  }
});

const allUserSlice = createSlice({
  name: 'alluser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUser.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllUser.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.data = action.payload;
    });
    builder.addCase(getAllUser.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });
  },
});

export default allUserSlice.reducer;
