import { createSlice } from '@reduxjs/toolkit';
import { getProfile } from '../api';

const initialState = {
  isLogin: false,
  user: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    logout: (state) => {
      state.isLogin = false;
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const fetchProfile = () => async (dispatch) => {
    dispatch(setLoading());
    try {
      console.log('Fetching profile...');
      const res = await getProfile();
      console.log('Profile fetched:', res.user);
      dispatch(login(res.user));
    } catch (error) {
      console.error('Fetch Profile Error:', error.message);
      dispatch(logout());
      dispatch(setError(error.message));
    }
  };
  

export const logoutUser = () => (dispatch) => {
  dispatch(logout());
};

export const { login, logout, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
