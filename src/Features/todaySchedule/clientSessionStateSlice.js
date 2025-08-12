import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../network/api';
import { endPoints } from '../../network/endpoints';

export const updateClientSessionState = createAsyncThunk(
  'clientSessionState/update',
  async ({ clientId, state, RemainingTime, date }, thunkAPI) => {
    try {
      const payload = {
        clientId,
        state,
        date,
        RemainingTime,
      };

      console.log('yyyyyyyyyy', payload);
      console.log('📤 Sending updateClientSessionState request');
      console.log('📦 Payload:', JSON.stringify(payload, null, 2));
      console.log(
        '🔗 Full URL:',
        api.defaults.baseURL + endPoints.ClientSessionState,
      );

      const response = await api.put(endPoints.ClientSessionState, payload);

      console.log('✅ Success Response:', response.status, response.data);
      return true;
    } catch (error) {
      if (error.response) {
        // Server responded with a non-2xx status code
        console.error('❌ Server Error:', {
          status: error.response.status,
          data: error.response.data,
        });
        return thunkAPI.rejectWithValue(
          error.response.data?.message ||
            `Server error: ${error.response.status}`,
        );
      } else if (error.request) {
        // Request was made but no response received
        console.error('❌ No Response Received:', error.request);
        return thunkAPI.rejectWithValue('No response from server.');
      } else {
        // Something else happened
        console.error('❌ Error in Request Setup:', error.message);
        return thunkAPI.rejectWithValue(error.message || 'Request setup error');
      }
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
