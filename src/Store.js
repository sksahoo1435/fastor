import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Component/Slices/userSlice';

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
