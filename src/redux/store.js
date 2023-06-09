import { configureStore } from '@reduxjs/toolkit';
import storageReducer from './storageSlice';

const store = configureStore({
  reducer: {
    storage: storageReducer,
  },
});

export default store;