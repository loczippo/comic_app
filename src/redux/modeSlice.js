import {createSlice} from '@reduxjs/toolkit';

const ModeSlice = createSlice({
  name: 'mode',
  initialState: {
    mode: "default",
  },
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const {setMode} = ModeSlice.actions;
export default ModeSlice.reducer;
