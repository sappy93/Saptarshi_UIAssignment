import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import rewardReducer from './reducers/rewardReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    reward: rewardReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: true,
    serializableCheck: false,
  }),
});

export default store;