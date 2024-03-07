import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import BoatService from '../api/BoatService';

const initialValues = {
  data: [],
  loading: 'ideal',
};
export const getAllBoat= createAsyncThunk('boat/getAllBoat', async () => {
  try {
    const res = await BoatService.get();
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

const boatSlice = createSlice({
  name: 'boat',
  initialState: initialValues,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllBoat.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllBoat.fulfilled, (state, action) => {
      state.loading = 'ideal';
      state.data = action.payload;
    });
    builder.addCase(getAllBoat.rejected, (state) => {
      state.loading = 'rejected';
    });
  },
});

export default boatSlice.reducer;
