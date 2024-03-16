import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mobileNumber: '',
  token: [],
  dataArray: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMobileNumber: (state, action) => {
      state.mobileNumber = action.payload;
    },
    setToken: (state, action) => {
      state.token.push(action.payload);
    },
    addData: (state, action) => {
      state.dataArray =[];
      state.dataArray.push(action.payload);
    },
  },
});

export const { setMobileNumber, setToken, addData } = userSlice.actions;

export default userSlice.reducer;
