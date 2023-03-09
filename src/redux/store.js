import { configureStore } from '@reduxjs/toolkit';
import themeSlicer from './modules/themeSlicer';
import searchSlicer from './modules/searchSlicer';
import overlaySlicer from './modules/overlayToggle';
import boxDataSlicer from './modules/boxDataSlicer';
import loginSlicer from './modules/loginSlicer';
import observeSlicer from './modules/observeSlicer';
import savedSlicer from './modules/savedToggleSlicer';
import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const reducers = combineReducers({
  themeSlicer,
  searchSlicer,
  overlaySlicer,
  boxDataSlicer,
  loginSlicer,
  observeSlicer,
  savedSlicer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['themeSlicer'],
};

const persistReducers = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistReducers,
});

export default store;
