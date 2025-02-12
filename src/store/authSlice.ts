import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for User login
export const login = createAsyncThunk(
  'auth/login',
  async ({username, password}, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'https://dummyjson.com/auth/login',
        {
          username: 'emilys',
          password: 'emilyspass',
          expiresInMins: 30,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

// Fetch AuthUser Data
export const fetchAuthUser = createAsyncThunk(
  'auth/fetchAuthUser ',
  async token => {
    const response = await axios.get('https://dummyjson.com/auth/user', {
      headers: {Authorization: `Bearer ${token}`},
    });
    console.log('fetchAuthUser====', fetchAuthUser);
    return response.data;
  },
);

// Refresh Token
export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async refreshToken => {
    const response = await axios.post('https://dummyjson.com/auth/refresh', {
      token: refreshToken,
    });
    return response.data;
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    refreshToken: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: state => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        console.log('action in login======', action);
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        console.log('state.token=====', state.token);
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(fetchAuthUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      });
  },
});

export const {logout} = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
