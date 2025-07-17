import { createAsyncThunk } from '@reduxjs/toolkit';
import { endPoints } from '../../network/endpoints';
import { api } from '../../network/api';
import { createSlice } from '@reduxjs/toolkit';
import { removeToken, saveToken } from '../../storage/asyncStorage';

export const loginThunk = createAsyncThunk(
  endPoints.Login,
  async (args, { rejectWithValue }) => {
    try {
      const response = await api.post(endPoints.Login, args);

      if (response.status === 200 && response.data.isAuthenticated) {
        const data = response.data;
        return {
          token: data.token,
          profileId: data.profileId,
          name: data.name,
          userName: data.userName,
          roles: data.roles,
          myModules: data.myModules,
          expiresOn: data.expiresOn,
        };
      } else {
        return rejectWithValue('Authentication failed');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const initialState = {
  user: null,
  token: null,
  profileId: null,
  isTherapist: false,
  isLoading: false,
  error: null,
  success: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.token = null;
      state.profileId = null;
      state.isTherapist = false;
      removeToken();
    },
    setIsTherapist: (state, action) => {
      state.isTherapist = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginThunk.pending, state => {
      state.isLoading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.user = action.payload;
      state.token = action.payload.token;
      state.profileId = action.payload.profileId;
      state.isTherapist = action.payload.roles?.includes('Therapist');
      saveToken(state.token, state.profileId);
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.success = false;
      state.error = action.payload || 'Login failed';
    });
  },
});

export const { logout, setIsTherapist } = userSlice.actions;
export default userSlice.reducer;
