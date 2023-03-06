import { createSlice } from '@reduxjs/toolkit';

const overlaySlicer = createSlice({
  name: 'overlaySlicer',
  initialState: false,
  reducers: {
    overlayToggle: (state) => !state,
  },
});

export default overlaySlicer.reducer;
export const { overlayToggle } = overlaySlicer.actions;
