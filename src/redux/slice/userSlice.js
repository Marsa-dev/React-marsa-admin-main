import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UsersServices from '../api/UsersServices';

export const initialState = {
  data: {},
  loading: 'idle',
  error: null,
  message: null,
  isloggedin: false,
};

export const getUser = createAsyncThunk('user/getUser', async () => {
  try {
    const res = await UsersServices.get();
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggedinUser: (state) => {
      state.isloggedin = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.data = action.payload;
      state.isloggedin = true;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });
  },
});

export const { loggedinUser } = userSlice.actions;

export default userSlice.reducer;
