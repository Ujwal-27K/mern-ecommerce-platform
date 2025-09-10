import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

const initialState = {
  userInfo: null,
  token: null,
  loading: false,
  error: null
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.data.accessToken);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data.message || err.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      localStorage.setItem('token', response.data.data.accessToken);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data.message || err.message);
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  await api.post('/auth/logout');
  localStorage.removeItem('token');
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.userInfo = action.payload.user;
      state.token = action.payload.accessToken;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.user;
        state.token = action.payload.accessToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.user;
        state.token = action.payload.accessToken;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.userInfo = null;
        state.token = null;
      });
  }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
