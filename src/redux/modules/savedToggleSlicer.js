import { createSlice } from '@reduxjs/toolkit';

const savedSlicer = createSlice({
  name: 'savedSlicer',
  initialState: false,
  reducers: {
    savedToggle: (state) => !state,
  },
});

export default savedSlicer.reducer;
export const { savedToggle } = savedSlicer.actions;
