import { configureStore } from '@reduxjs/toolkit';
import themeSlicer from './modules/themeSlicer';
import searchSlicer from './modules/searchSlicer';

const store = configureStore({
  reducer: { themeSlicer, searchSlicer },
});

export default store;
