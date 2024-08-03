import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userReducer';
import spiritReducer from '../reducers/spiritReducers';
import stepReducer from '../reducers/stepReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    spirit: spiritReducer,
    steps: stepReducer,
  },
});

export default store;