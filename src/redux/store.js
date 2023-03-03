import { configureStore } from '@reduxjs/toolkit';
import themeSlicer from './modules/themeSlicer';

const store = configureStore({
  reducer: { themeSlicer },
});

export default store;
