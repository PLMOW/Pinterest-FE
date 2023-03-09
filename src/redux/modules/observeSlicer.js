import { createSlice } from '@reduxjs/toolkit';

const observeSlicer = createSlice({
  name: 'observeSlicer',
  initialState: true,
  reducers: {
    setObserve: (state, action) => action.payload,
  },
});

export default observeSlicer.reducer;
export const { setObserve } = observeSlicer.actions;
