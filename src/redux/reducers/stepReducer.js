import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  steps: 0,
  goal: 10000,
};

const stepSlice = createSlice({
  name: 'steps',
  initialState,
  reducers: {
    setSteps: (state, action) => {
      state.steps = action.payload;
    },
    setGoal: (state, action) => {
      state.goal = action.payload;
    },
  },
});

export const { setSteps, setGoal } = stepSlice.actions;
export default stepSlice.reducer;