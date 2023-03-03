import { createSlice } from '@reduxjs/toolkit';

const themeSlicer = createSlice({
  name: 'themeSlicer',
  initialState: false,
  reducers: {
    toggle: (state) => !state,
  },
});

export default themeSlicer.reducer;
export const { toggle } = themeSlicer.actions;
