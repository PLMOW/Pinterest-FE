import { createSlice } from '@reduxjs/toolkit';

const boxDataSlicer = createSlice({
  name: 'boxDataSlicer',
  initialState: {},
  reducers: {
    setBoxData: (state, action) => action.payload,
  },
});

export default boxDataSlicer.reducer;
export const { setBoxData } = boxDataSlicer.actions;
