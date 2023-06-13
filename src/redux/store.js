import { configureStore } from '@reduxjs/toolkit';
import storageReducer from './storageSlice';
import modeReducer from './modeSlice';

const store = configureStore({
  reducer: {
    storage: storageReducer,
    mode: modeReducer
  },
});

export default store;