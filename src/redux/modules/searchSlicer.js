import { createSlice } from '@reduxjs/toolkit';

const searchSlicer = createSlice({
  name: 'searchSlicer',
  initialState: [],
  reducers: {
    setSearchValue: (state, action) => {
      const { payload } = action;

      return payload;
    },
  },
});

export default searchSlicer.reducer;
export const { setSearchValue } = searchSlicer.actions;
