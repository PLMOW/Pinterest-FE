import { configureStore } from '@reduxjs/toolkit';
import themeSlicer from './modules/themeSlicer';
import searchSlicer from './modules/searchSlicer';
import overlaySlicer from './modules/overlayToggle';

const store = configureStore({
  reducer: { themeSlicer, searchSlicer, overlaySlicer },
});

export default store;
