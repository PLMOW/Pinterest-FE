import { configureStore } from '@reduxjs/toolkit';
import themeSlicer from './modules/themeSlicer';
import searchSlicer from './modules/searchSlicer';
import overlaySlicer from './modules/overlayToggle';
import boxDataSlicer from './modules/boxDataSlicer';

const store = configureStore({
  reducer: { themeSlicer, searchSlicer, overlaySlicer, boxDataSlicer },
});

export default store;
