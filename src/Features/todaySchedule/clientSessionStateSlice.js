import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../network/api';
import { endPoints } from '../../network/endpoints';

export const updateClientSessionState = createAsyncThunk(
  'clientSessionState/update',
  async ({ clientId, state, RemainingTime, date }, thunkAPI) => {
    try {
      await api.post(endPoints.ClientSessionState, {
        clientId,
        state,
        RemainingTime,
        date,
      });
      return true; // just return success indicator
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Unknown error');
    }
  },
);

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const clientSessionStateSlice = createSlice({
  name: 'clientSessionState',
  initialState,
  reducers: {
    resetClientSessionState: state => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(updateClientSessionState.pending, state => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateClientSessionState.fulfilled, state => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateClientSessionState.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetClientSessionState } = clientSessionStateSlice.actions;

export default clientSessionStateSlice.reducer;
