import { createSlice } from '@reduxjs/toolkit';

const loginSlicer = createSlice({
  name: 'loginSlicer',
  initialState: false,
  reducers: {
    setLogin: (state, action) => action.payload,
  },
});

export default loginSlicer.reducer;
export const { setLogin } = loginSlicer.actions;
