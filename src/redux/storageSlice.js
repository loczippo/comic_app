import { createSlice } from '@reduxjs/toolkit';

const storageSlice = createSlice({
  name: 'storage',
  initialState: {
    count: 0,
  },
  reducers: {
    setStorageCount: (state, action) => {
      state.count = action.payload;
    },
  },
});

export const { setStorageCount } = storageSlice.actions;
export default storageSlice.reducer;