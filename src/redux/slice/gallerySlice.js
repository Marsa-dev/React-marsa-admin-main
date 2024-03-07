import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import GalleryService from '../api/GalleryService';

const initialValues = {
  data: [],
  loading: 'ideal',
};
export const getAllGallery= createAsyncThunk('gallery/getAllGallery', async () => {
  try {
    const res = await GalleryService.get();
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

const gallerySlice = createSlice({
  name: 'gallery',
  initialState: initialValues,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllGallery.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllGallery.fulfilled, (state, action) => {
      state.loading = 'ideal';
      state.data = action.payload;
    });
    builder.addCase(getAllGallery.rejected, (state) => {
      state.loading = 'rejected';
    });
  },
});

export default gallerySlice.reducer;
