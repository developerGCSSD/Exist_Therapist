import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Features/auth/authSlice';
import therapistScheduleReducer from '../Features/todaySchedule/scheduleSlice';
import clientSessionStateReducer from '../Features/todaySchedule/clientSessionStateSlice';
const store = configureStore({
  reducer: {
    user: userReducer,
    therapistSchedule: therapistScheduleReducer,
    clientSessionState: clientSessionStateReducer,
  },
});

export default store;
