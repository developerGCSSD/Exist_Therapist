import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Features/auth/authSlice';
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
