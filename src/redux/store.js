import { configureStore } from '@reduxjs/toolkit';
import themeSlicer from './modules/themeSlicer';
import searchSlicer from './modules/searchSlicer';
import overlaySlicer from './modules/overlayToggle';
import boxDataSlicer from './modules/boxDataSlicer';
import loginSlicer from './modules/loginSlicer';
import observeSlicer from './modules/observeSlicer';

const store = configureStore({
  reducer: {
    themeSlicer,
    searchSlicer,
    overlaySlicer,
    boxDataSlicer,
    loginSlicer,
    observeSlicer,
  },
});

export default store;
