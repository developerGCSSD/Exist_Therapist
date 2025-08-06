import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { endPoints } from '../../network/endpoints';
import { api } from '../../network/api';
import { retrieveToken } from '../../storage/asyncStorage';
import moment from 'moment';

export const fetchTherapistSchedule = createAsyncThunk(
  'therapist/fetchSchedule',
  async (date, { rejectWithValue }) => {
    try {
      const { profileId } = await retrieveToken();
      if (!profileId) throw new Error('Therapist ID not found');

      const formattedDate = moment.isMoment(date)
        ? date.format('MM/DD/YYYY')
        : moment(date).format('MM/DD/YYYY');

      const response = await api.get(endPoints.TherapistSchedule, {
        params: {
          TherapistId: profileId,
          selectedDate: formattedDate,
        },
      });
      console.log('✅ API response:', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const initialState = {
  date: null,
  therapistId: null,
  therapistName: '',
  availableTime: [],
  offlineTime: [],
  clientBookings: [],
  isLoading: false,
  error: null,
};

export const therapistScheduleSlice = createSlice({
  name: 'therapistSchedule',
  initialState,
  reducers: {
    clearTherapistSchedule: state => {
      state.date = null;
      state.therapistId = null;
      state.therapistName = '';
      state.availableTime = [];
      state.offlineTime = [];
      state.clientBookings = [];
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTherapistSchedule.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTherapistSchedule.fulfilled, (state, action) => {
        const { date, therapistSchedule } = action.payload;

        state.isLoading = false;
        state.date = date;
        state.therapistId = therapistSchedule.therapistId;
        state.therapistName = therapistSchedule.therapistName;
        state.availableTime = therapistSchedule.availableTime;
        state.offlineTime = therapistSchedule.offlineTime;
        state.clientBookings = therapistSchedule.clientBookings;
      })
      .addCase(fetchTherapistSchedule.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch schedule';
      });
  },
});

export const { clearTherapistSchedule } = therapistScheduleSlice.actions;
export default therapistScheduleSlice.reducer;
